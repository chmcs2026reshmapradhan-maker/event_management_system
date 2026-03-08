import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import EventCard from "../components/EventCard.jsx";
import EventNotFound from "../components/EventNotFound.jsx";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (error) {
        toast.error("Failed to load events ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Dashboard counts
  const today = new Date();

  const upcomingEvents = events.filter(
    (event) => new Date(event.eventDate) >= today
  );

  const completedEvents = events.filter(
    (event) => new Date(event.eventDate) < today
  );

  // Filters
  const filteredEvents = events.filter((event) => {
    const query = search.toLowerCase();
    const eventDate = new Date(event.eventDate);

    const autoStatus =
      eventDate >= today ? "Upcoming" : "Completed";

    const matchesSearch =
      event.eventTitle?.toLowerCase().includes(query) ||
      event.eventLocation?.toLowerCase().includes(query);

    const matchesStartDate =
      !startDate || eventDate >= new Date(startDate);

    const matchesEndDate =
      !endDate || eventDate <= new Date(endDate);

    const matchesCategory =
      !category || event.eventCategory === category;

    const matchesStatus =
      !status || autoStatus === status;

    return (
      matchesSearch &&
      matchesStartDate &&
      matchesEndDate &&
      matchesCategory &&
      matchesStatus
    );
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">

        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="text-sm text-base-content/70">
                Total Events
              </h3>
              <p className="text-2xl font-bold">
                {events.length}
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="text-sm text-base-content/70">
                Upcoming Events
              </h3>
              <p className="text-2xl font-bold text-success">
                {upcomingEvents.length}
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="text-sm text-base-content/70">
                Completed Events
              </h3>
              <p className="text-2xl font-bold text-error">
                {completedEvents.length}
              </p>
            </div>
          </div>

        </div>

        {/* Heading */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Events</h2>

          <span className="badge badge-primary badge-lg">
            Total: {events.length}
          </span>
        </div>

        {/* Showing count */}
        <div className="mb-4 text-sm text-base-content/70">
          Showing {filteredEvents.length} of {events.length} events
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

  {/* Search */}
  <div>
    <label className="label">
      <span className="label-text">Search</span>
    </label>
    <input
      type="text"
      placeholder="Search events..."
      className="input input-bordered w-full"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {/* Start Date */}
  <div>
    <label className="label">
      <span className="label-text">Start Date</span>
    </label>
    <input
      type="date"
      className="input input-bordered w-full"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
  </div>

  {/* End Date */}
  <div>
    <label className="label">
      <span className="label-text">End Date</span>
    </label>
    <input
      type="date"
      className="input input-bordered w-full"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </div>

  {/* Category */}
  <div>
    <label className="label">
      <span className="label-text">Category</span>
    </label>
    <select
      className="select select-bordered w-full"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      <option value="Conference">Conference</option>
      <option value="Workshop">Workshop</option>
      <option value="Seminar">Seminar</option>
      <option value="Meetup">Meetup</option>
      <option value="Party">Party</option>
      <option value="Sports">Sports</option>
    </select>
  </div>

  {/* Status */}
  <div>
    <label className="label">
      <span className="label-text">Status</span>
    </label>
    <select
      className="select select-bordered w-full"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="">All Status</option>
      <option value="Upcoming">Upcoming</option>
      <option value="Completed">Completed</option>
      {/* <option value="Ongoing">Ongoing</option> */}
    </select>
  </div>

</div>


          <button
            className="btn btn-outline"
            onClick={() => {
              setSearch("");
              setStartDate("");
              setEndDate("");
              setCategory("");
              setStatus("");
            }}
          >
            Reset
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-primary py-10">
            Loading events...
          </div>
        )}

        {/* No events */}
        {!loading && events.length === 0 && <EventNotFound />}

        {/* No filtered events */}
        {!loading && events.length > 0 && filteredEvents.length === 0 && (
          <EventNotFound />
        )}

        {/* Event Grid */}
        {!loading && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                setEvents={setEvents}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;