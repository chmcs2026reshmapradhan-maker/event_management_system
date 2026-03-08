import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import {
  LoaderIcon,
  Trash2Icon,
  ArrowLeftIcon,
} from "lucide-react";

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Fetch Event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event", error);
        toast.error("Failed to fetch event ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // ✅ Delete Event
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?"))
      return;

    try {
      await api.delete(`/events/${id}`);
      toast.success("Event deleted successfully 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete event ❌");
    }
  };

  // ✅ Update Event
  const handleSave = async () => {
    if (!event.eventTitle.trim()) {
      toast.error("Event title required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/events/${id}`, event);
      toast.success("Event updated successfully ✅");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event ❌");
    } finally {
      setSaving(false);
    }
  };
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

  // ✅ Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* Top Buttons */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Events
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Event
            </button>
          </div>

          {/* Card */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">

              {/* Event Title */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Event Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={event.eventTitle}
                  onChange={(e) =>
                    setEvent({ ...event, eventTitle: e.target.value })
                  }
                />
              </div>

              {/* Event Category */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Event Category</span>
                  </label>
                  <input
                  type="text"
                  placeholder="Conference / Workshop / Fest"
                  className="input input-bordered"
                  value={event.eventCategory}
                  onChange={(e) =>
                    setEvent({ ...event, eventCategory: e.target.value })
                  }
                  />
                  </div>

              {/* Organizer */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Organizer Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={event.organizerName}
                  onChange={(e) =>
                    setEvent({ ...event, organizerName: e.target.value })
                  }
                />
              </div>

              {/* Location */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={event.eventLocation}
                  onChange={(e) =>
                    setEvent({ ...event, eventLocation: e.target.value })
                  }
                />
              </div>

              <input
              type="date"
              className="input input-bordered"
              value={event.eventDate}
              onChange={(e) =>
                setEvent({ ...event, eventDate: e.target.value })
              }/>
              {/* 🔥 Automatic Status Preview */}
              {event.eventDate && (
                <div className="mt-3">
                  <span className={`badge ${getBadgeColor(calculateStatus(event.eventDate))}`}>
                    {calculateStatus(event.eventDate)}
                    </span>
                    </div>
                  )}

  

              {/* Save Button */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;