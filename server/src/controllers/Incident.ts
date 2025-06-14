import badRequestError from "../errors/badRequestError";
import notFoundError from "../errors/notFoundError";
import UnAuthenticatedError from "../errors/unAuthenticatedError";
import { Incident } from "../models/Incident";
import { Request, Response } from "express";

const getHeader = (req: Request, key: string): string | undefined => {
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

    const { title, description, location } = req.body;

    if (!title || !description || !location) {
      throw new badRequestError("Title, description, and location are required.");
    }

    const newIncident = new Incident({
      title,
      description,
      location,
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
    const incidents = await Incident.find().sort({ created_at: -1 });
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

    const { status, title, description, location } = req.body;

    const incident = await Incident.findById(req.params.id);
    if (!incident) throw new notFoundError("Incident not found.");

    // Check if user is the reporter or has appropriate role
    const isReporter = incident.reported_by.toString() === userId;
    const isAuthorizedRole = ["supervisor", "officer"].includes(userRole);

    if (!isReporter && !isAuthorizedRole) {
      throw new UnAuthenticatedError("Not authorized to update this incident");
    }

    // Citizens can only update certain fields
    if (userRole === "citizen" && status && status !== incident.status) {
      throw new badRequestError("Citizens cannot change incident status");
    }

    // Only supervisors/officers can change status
    if (status && !["supervisor", "officer"].includes(userRole)) {
      throw new UnAuthenticatedError("Only supervisors/officers can change incident status");
    }

    const updates: any = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (location) updates.location = location;
    if (status) updates.status = status;

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