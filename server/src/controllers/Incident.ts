import { Types } from "mongoose";
import badRequestError from "../errors/badRequestError";
import notFoundError from "../errors/notFoundError";
import UnAuthenticatedError from "../errors/unAuthenticatedError";
import { Incident } from "../models/Incident";
import { Request, Response } from "express";

export const getHeader = (req: Request, key: string): string | undefined => {
  const value = req.headers[key];
  return Array.isArray(value) ? value[0] : value;
};

export const createIncident = async (req: Request, res: Response) => {
  try {
    const userId = getHeader(req, 'x-user-id');
    const userRole = getHeader(req, 'x-user-role');

    if (!userId || !userRole) {
      throw new UnAuthenticatedError("Not authenticated");
    }

    if (userRole !== "citizen") {
      throw new UnAuthenticatedError("Only citizens can report incidents.");
    }

    const { title, description, address } = req.body;

    if (!title || !description || !address) {
      throw new badRequestError("Title, description, and address are required.");
    }

    const newIncident = new Incident({
      title,
      description,
      address,
      reported_by: userId,
      status: "pending",
    });

    await newIncident.save();

    res.status(201).json({ 
      message: "Incident reported successfully", 
      incident: newIncident 
    });
  } catch (error) {
    console.error("Error creating incident:", error);
    res.status(500).json({ message: "Failed to report incident" });
  }
};

export const getAllIncidents = async (req: Request, res: Response) => {
  try {
    const incidents = await Incident.find().sort({ created_at: -1 }).populate('reported_by', 'fullName email');
    res.status(200).json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    res.status(500).json({ message: "Failed to retrieve incidents" });
  }
};

export const getSingleIncident = async (req: Request, res: Response) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) throw new notFoundError("Incident not found");

    res.status(200).json(incident);
  } catch (error) {
    console.error("Error retrieving incident:", error);
    res.status(500).json({ message: "Failed to retrieve incident" });
  }
};

export const updateIncident = async (req: Request, res: Response) => {
  try {
    const userId = getHeader(req, 'x-user-id');
    const userRole = getHeader(req, 'x-user-role');

    if (!userId || !userRole) {
      throw new UnAuthenticatedError("Not authenticated");
    }

    const { status, title, description, address, assigned_to } = req.body;

    const incident = await Incident.findById(req.params.id);
    if (!incident) throw new notFoundError("Incident not found.");

    const isReporter = incident.reported_by.toString() === userId;
    const isAuthorizedRole = ["supervisor", "officer"].includes(userRole);

    if (!isReporter && !isAuthorizedRole) {
      throw new UnAuthenticatedError("Not authorized to update this incident");
    }

    if (userRole === "citizen" && status && status !== incident.status) {
      throw new badRequestError("Citizens cannot change incident status");
    }

    if (status && !["supervisor", "officer"].includes(userRole)) {
      throw new UnAuthenticatedError("Only supervisors/officers can change incident status");
    }

    const updates: any = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (address) updates.address = address;
    if (assigned_to) updates.status = "in_progress"
    if (status) updates.status = status;
    if (assigned_to) updates.assigned_to = assigned_to

    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.status(200).json({ message: "Incident updated", incident: updatedIncident });
  } catch (error) {
    console.error("Error updating incident:", error);
    res.status(500).json({ message: "Failed to update incident" });
  }
};

export const deleteIncident = async (req: Request, res: Response) => {
  try {
    const userRole = req.headers['x-user-role'];

    if (!userRole) {
      throw new UnAuthenticatedError("Not authenticated");
    }

    if (userRole !== "supervisor") {
      throw new UnAuthenticatedError("Only supervisors can delete incidents.");
    }

    const deletedIncident = await Incident.findByIdAndDelete(req.params.id);

    if (!deletedIncident) throw new notFoundError("Incident not found.");

    res.status(200).json({ message: "Incident deleted" });
  } catch (error) {
    console.error("Error deleting incident:", error);
    res.status(500).json({ message: "Failed to delete incident" });
  }
};

export const getIncidentsByReporter = async (req: Request, res: Response) => {
  try {
    // Get user ID from header
    const userId = getHeader(req, 'x-user-id');
    
    // Validate user ID exists and is valid MongoDB ID
    if (!userId) {
      throw new badRequestError('User ID is required in x-user-id header');
    }
    
    if (!Types.ObjectId.isValid(userId)) {
      throw new badRequestError('Invalid user ID format');
    }

    // Convert to ObjectId
    const reporterId = new Types.ObjectId(userId);

    // Optional query parameters
    const { status, limit = '10', page = '1' } = req.query;
    const limitNum = parseInt(limit as string);
    const pageNum = parseInt(page as string);

    // Build query
    const query: any = { reported_by: reporterId };
    if (status) query.status = status;

    // Get incidents with pagination
    const incidents = await Incident.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .populate('reported_by', 'name email'); // Adjust fields as needed

    // Get total count for pagination
    const totalCount = await Incident.countDocuments(query);

    if (incidents.length === 0) {
      throw new notFoundError('No incidents found for this user');
    }

    res.status(200).json({
      success: true,
      count: incidents.length,
      total: totalCount,
      page: pageNum,
      pages: Math.ceil(totalCount / limitNum),
      data: incidents
    });

  } catch (error) {
    console.error('Error fetching incidents by reporter:', error);
    
    if (error instanceof badRequestError || error instanceof notFoundError) {
      throw error;
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while fetching incidents'
    });
  }
};