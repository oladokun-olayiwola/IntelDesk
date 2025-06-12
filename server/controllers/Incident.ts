import { Request, Response } from "express";
import { Incident } from "../models/Incident";
import badRequestError from "../errors/badRequestError";

export const createIncident = async (req: Request, res: Response) => {
  const { status, reported_by, title, description, location } = req.body;

  if (!reported_by || !title || !description || !location) throw new badRequestError("Missing required fields.")

  const incident = await Incident.create({
    status: status || 'open',
    reported_by,
    title,
    description,
    location,
  });

  res.status(201).json({
    message: 'Incident has been reported.',
    error: false,
    incident,
  });
};

export const getIncidents = async (req: Request, res: Response) => {
  const incidents = await Incident.find().sort({ createdAt: -1 });
  res.status(200).json({ incidents, error: false });
};

export const getIncidentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const incident = await Incident.findById(id);

  if (!incident) throw new badRequestError("Incident not found.")

  res.status(200).json({ incident, error: false });
};

export const updateIncident = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const incident = await Incident.findByIdAndUpdate(id, updates, { new: true });

  if (!incident) throw new badRequestError("Incident not found.")

  res.status(200).json({ message: 'Incident updated.', incident, error: false });
};

export const deleteIncident = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Incident.findByIdAndDelete(id);

  if (!deleted) throw new badRequestError("Incident not found.")

  res.status(200).json({ message: 'Incident deleted.', error: false });
};
