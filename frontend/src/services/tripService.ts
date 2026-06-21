import api from "./api";

export const getTrips = () => api.get("/trips");

export const getTripById = (id: string) => api.get(`/trips/${id}`);

export const deleteTrip = (id: string) => api.delete(`/trips/${id}`);

export const generateTrip = (data: {
  destination: string;
  days: number;
  budget: string;
  interests: string[];
}) => api.post("/trips/generate", data);

export const regenerateTrip = (
  id: string,
  tripData: {
    destination: string;
    days: number;
    budget: string;
    interests: string[];
  },
) => api.put(`/trips/${id}/regenerate`, tripData);
