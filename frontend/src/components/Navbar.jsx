import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon, CalendarDays } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-amber-300 border-b border-b-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">

          {/* Logo / Title */}
          <Link to="/" className="flex items-center gap-2">
            <CalendarDays className="size-6 text-primary" />
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              Event Management
            </h1>
          </Link>

          {/* Create Button */}
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary text-white">
              <PlusIcon className="size-5" />
              <span>New Event</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;