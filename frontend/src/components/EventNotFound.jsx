import React from "react";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const EventNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16
    space-y-6 max-w-md mx-auto text-center">

      <div className="bg-primary/10 rounded-full p-8">
        <CalendarDays className="size-10 text-primary" />
      </div>

      <h3 className="text-2xl font-bold">No Events Yet</h3>

      <p className="text-base-content/70">
        Ready to organize something amazing? Create your first event now.
      </p>

      <Link to="/create" className="btn btn-primary">
        Create First Event
      </Link>

    </div>
  );
};

export default EventNotFound;