import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [organizerName, setOrganizerName] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 Automatic Status Calculator
  const calculateStatus = (date) => {
    if (!date) return "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) return "Upcoming";
    if (selectedDate.getTime() === today.getTime()) return "Ongoing";
    return "Completed";
  };

  const getBadgeColor = (status) => {
    if (status === "Upcoming") return "badge-success";
    if (status === "Ongoing") return "badge-warning";
    return "badge-neutral";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/events", {
        eventTitle,
        eventDate,
        eventLocation,
        eventCategory,
        organizerName,
      });

      toast.success("Event created successfully 🎉");
      navigate("/");
    } catch (error) {
      console.log("Error creating event", error);
      toast.error("Failed to create event ❌");
    } finally {
      setLoading(false);
    }
  };

  const statusPreview = calculateStatus(eventDate);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Events
          </Link>

          <div className="max-w-xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Create New Event
              </h2>

              <form onSubmit={handleSubmit}>

                {/* Event Title */}
                <div className="form-control ">
                  <label className="label">
                    <span className=" label-text">
                       Event Title
                    </span>
                  </label>
                  <input
                    type="  text"
                    placeholder="  Event Title"
                    className="  input input-bordered"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Event Date */}
                <div className="form-control ">
                  <label className="label">
                    <span className=" label-text">
                      Event Date
                    </span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                  />

                  {/* 🔥 Automatic Status Preview */}
                  {eventDate && (
                    <div className="mt-3">
                      <span className={`badge ${getBadgeColor(statusPreview)}`}>
                        {statusPreview}
                      </span>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="form-control ">
                  <label className="  label">
                    <span className=" label-text">
                      Event Location
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="  Event Location"
                    className="  input input-bordered"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
<div className="form-control">
  <label className="label">
    <span className="label-text">Event Category</span>
  </label>

  <select
    className="select select-bordered"
    value={eventCategory}
    onChange={(e) => setEventCategory(e.target.value)}
    required
  >
    <option value="">Select Category</option>
    <option value="Conference">Conference</option>
    <option value="Workshop">Workshop</option>
    <option value="Seminar">Seminar</option>
    <option value="Meetup">Meetup</option>
    <option value="Party">Party</option>
    <option value="Sports">Sports</option>
  </select>
</div>
                {/* Organizer */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">
                      Organizer Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="  Organizer Name"
                    className="  input input-bordered"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    required
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Event"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;