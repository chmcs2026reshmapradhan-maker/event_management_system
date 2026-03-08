import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  UserCircle,
  Edit2,
  Trash2,
} from "lucide-react";
import { formatData } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const EventCard = ({ event, setEvents }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === `/event/${event._id}`;

  const handleDelete = async () => {
    try {
      await api.delete(`/events/${event._id}`);
      setEvents((prev) => prev.filter((e) => e._id !== event._id));
      toast.success("Event deleted successfully 🎉");
    } catch {
      toast.error("Failed to delete event ❌");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Link
        to={`/event/${event._id}`}
        className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200 ${
          isActive
            ? "border-primary shadow-lg"
            : "border-base-300"
        } hover:border-primary hover:shadow-xl`}
      >
        <div className="flex justify-between items-start">
          <p className="text-xs text-base-content/60 truncate">
            {event._id}
          </p>
          <span className={`badge ${
            event.eventStatus === "Upcoming" ? "badge-info" : event.eventStatus === "Ongoing" ? "badge-warning" : event.eventStatus == " Completed" ? "badge-success" : "badge-error"
          }`}>
            {event.eventStatus}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-base-content/70">
  <CalendarDays className="size-4 text-primary" />
  <p className="text-sm">
    {new Date(event.eventDate).toLocaleDateString()}
  </p>
</div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" />
            <p className="font-medium text-base-content line-clamp-1">
              {event.eventTitle}
            </p>

            <span className="badge badge-outline badge-sm mt-1"> {event.eventCategory}</span>
          </div>

          <div className="flex items-center gap-2 text-base-content/70">
            <UserCircle className="size-4 text-primary" />
            <p className="text-sm line-clamp-1">
              {event.organizerName}
            </p>
          </div>

          <div className="flex items-center gap-2 text-base-content/70">
            <MapPin className="size-4 text-primary" />
            <p className="text-sm line-clamp-1">
              {event.eventLocation}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-xs text-base-content/60">
            {formatData(new Date(event.createdAt))}
          </span>

          <div className="flex items-center gap-4">
            <div
              className="tooltip tooltip-warning"
              data-tip="Edit event"
            >
              <Link to={`/event/${event._id}`}>
                <Edit2 className="size-4 text-warning hover:scale-110 transition" />
              </Link>
            </div>

            <div
              className="tooltip tooltip-error"
              data-tip="Delete event"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="text-error hover:scale-110 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" />
              Delete Event
            </h3>

            <p className="py-4 text-base-content/70">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-base-content">
                "{event.eventTitle}"
              </span>
              ? <br />
              This action cannot be undone.
            </p>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" />
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default EventCard;