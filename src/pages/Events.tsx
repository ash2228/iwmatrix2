import { CheckCheck } from "lucide-react";
import React, { useState } from "react";
import Layout from "../layout/Layout";
import styled from "styled-components";

interface Event {
  name: string;
  img: string;
  desc: string;
}

interface TeamMember {
  name: string;
  phone: string;
  email: string;
}

interface EventDetails {
  participationType: "solo" | "team";
  team: TeamMember[];
}

const events: Event[] = [

  {
    name: "HACKATHON",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "./assets/hacakthom.png",
  },
  {
    name: "LIVE PROJECTS",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "./assets/LIVE PROJECT.png",
  },
  {
    name: "Gaming Parlor",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "./assets/GAME PAR.png",
  },
  {
    name: "DSA COMPETITION",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "./assets/GAME PAR.png",
  },
  {
    name: "UI/UX COMPETITION",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "./assets/UI-UX DESIGN.png",
  },
  {
    name: "INSIDE EDGE",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "./assets/INSIDE EDGE.png",
  },
  {
    name: "GAMING TOURNAMENT",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "./assets/GAME TOUR.png",
  },
  {
    name: "NEWS SURGE",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "./assets/NEWS SURGE.png",
  },
  {
    name: "PITCHERS",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "./assets/PITCHERS.png",
  },

];

const Events: React.FC = () => {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showHackathonForm, setShowHackathonForm] = useState<boolean>(false);
  const [showLiveProjectsForm, setShowLiveProjectsForm] = useState<boolean>(false);
  const [showGamingTournamentForm, setShowGamingTournamentForm] = useState<boolean>(false);
  const [hackathonDetails, setHackathonDetails] = useState<EventDetails>({
    participationType: "solo",
    team: [{ name: "", phone: "", email: "" }],
  });
  const [liveProjectsDetails, setLiveProjectsDetails] = useState<EventDetails>({
    participationType: "solo",
    team: [{ name: "", phone: "", email: "" }],
  });
  const [gamingTournamentDetails, setGamingTournamentDetails] = useState<EventDetails>({
    participationType: "solo",
    team: [{ name: "", phone: "", email: "" }],
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSelect = (event: Event) => {
    if (event.name === "HACKATHON" || event.name === "LIVE PROJECTS" || event.name === "GAMING TOURNAMENT") {
      if (selectedEvents.includes(event)) {
        setSelectedEvents((prev) => prev.filter((e) => e.name !== event.name));
      } else {
        if (event.name === "HACKATHON") setShowHackathonForm(true);
        if (event.name === "LIVE PROJECTS") setShowLiveProjectsForm(true);
        if (event.name === "GAMING TOURNAMENT") setShowGamingTournamentForm(true);
      }
    } else {
      setSelectedEvents((prev) =>
        prev.includes(event)
          ? prev.filter((e) => e !== event)
          : [...prev, event]
      );
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number | undefined,
    type: "hackathon" | "liveProjects" | "gamingTournament"
  ) => {
    const { name, value } = e.target;
    const setDetails = type === "hackathon" ? setHackathonDetails : type === "liveProjects" ? setLiveProjectsDetails : setGamingTournamentDetails;
    const details = type === "hackathon" ? hackathonDetails : type === "liveProjects" ? liveProjectsDetails : gamingTournamentDetails;

    if (name === "participationType") {
      setDetails((prev) => ({
        ...prev,
        participationType: value as "solo" | "team",
        team: value === "solo" ? [{ name: "", phone: "", email: "" }] : prev.team,
      }));
    } else if (index !== undefined) {
      const newTeam = [...details.team];
      newTeam[index][name as keyof TeamMember] = value;
      setDetails((prev) => ({ ...prev, team: newTeam }));
    }
  };

  const handleAddTeamMember = (type: "hackathon" | "liveProjects" | "gamingTournament") => {
    const setDetails = type === "hackathon" ? setHackathonDetails : type === "liveProjects" ? setLiveProjectsDetails : setGamingTournamentDetails;
    const details = type === "hackathon" ? hackathonDetails : type === "liveProjects" ? liveProjectsDetails : gamingTournamentDetails;

    setDetails((prev) => ({
      ...prev,
      team: [...prev.team, { name: "", phone: "", email: "" }],
    }));
  };

  const handleRemoveTeamMember = (index: number, type: "hackathon" | "liveProjects" | "gamingTournament") => {
    const setDetails = type === "hackathon" ? setHackathonDetails : type === "liveProjects" ? setLiveProjectsDetails : setGamingTournamentDetails;
    const details = type === "hackathon" ? hackathonDetails : type === "liveProjects" ? liveProjectsDetails : gamingTournamentDetails;

    setDetails((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (type: "hackathon" | "liveProjects" | "gamingTournament"): boolean => {
    const errors: string[] = [];
    const details = type === "hackathon" ? hackathonDetails : type === "liveProjects" ? liveProjectsDetails : gamingTournamentDetails;
    details.team.forEach((member, index) => {
      if (!member.name || !member.phone || !member.email) {
        errors.push(`Please fill out all fields for team member ${index + 1}`);
      }
    });
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmitForm = (type: "hackathon" | "liveProjects" | "gamingTournament") => {
    if (validateForm(type)) {
      const event = events.find((e) => e.name === (type === "hackathon" ? "HACKATHON" : type === "liveProjects" ? "LIVE PROJECTS" : "GAMING TOURNAMENT"));
      if (event) {
        setSelectedEvents((prev) => [...prev, event]);
        if (type === "hackathon") setShowHackathonForm(false);
        if (type === "liveProjects") setShowLiveProjectsForm(false);
        if (type === "gamingTournament") setShowGamingTournamentForm(false);
      }
    }
  };

  const calculateTotalPrice = (): number => {
    let total = 0;
    selectedEvents.forEach((event) => {
      if (event.name === "GAMING TOURNAMENT") {
        total += gamingTournamentDetails.participationType === "solo" ? 100 : 400;
      } else if (event.name !== "HACKATHON" && event.name !== "LIVE PROJECTS") {
        total += 50;
      }
    });
    return total;
  };

  const handleSubmit = () => {
    const totalPrice = calculateTotalPrice();
    setTotal(totalPrice);
    // Additional logic for form submission can be added here
  };

  return (
    <EventContainer className="bg-white z-50">
         <div className=''>
          <video autoPlay muted loop id="myVideo" className="brightness-50 z-10 fixed right-0 bottom-0 w-full h-full object-cover   top-0 ">
            <source src="./assets/3.mov" type="video/mp4" className='w-full h-full object-contain'/>
          </video>
          <div className=' absolute z-20  w-full h-full object-cover  top-0 '> 
    <img src="./assets/7.png" alt=""  className='blur-[350px] bg-no-repeat w-full h-full object-cover'/>
          </div>
    </div>
    <Layout>
    <section className="h-full w-full flex flex-col justify-center text-center z-[10000] relative">
    <div className="glitch-wrapper mt-[40px]">
	              <div className="glitch " data-glitch="Events">Events</div>
        </div>

      <div className="  m-auto flex flex-col justify-center text-center gap-10 sm:gap-20 p-4 sm:p-10 ">

      {/* <div className=" container  justify-center text-center gap-10 sm:gap-20 p-4 sm:p-10 "> */}
        {events.map((event, index) => (
          <div
            key={index}
            className={`text-white w-[80%] text-left flex flex-col sm:flex-row justify-center  sm:items-center  gap-1 sm:gap-5 sm:justify-between rounded-2xl h-full sm:h-[300px] shadow-[0px_0px_0px_1px_#4fd1c5] ${
              selectedEvents.includes(event) ? "bg-cyan-900" : ""
            }`}
          >
            {/* image */}
            <div className="w-full sm:w-[300px]">
              <img
                className="rounded-t-2xl sm:rounded-l-2xl object-cover w-full h-full"
                src={event.img}
                alt="image"
              />
            </div>

            {/* event name and desc */}
            <div className="w-[90%] sm:w-[600px] flex flex-col justify-center items-center py-5">
              <div className="text-sm sm:text-sm font-semibold text-center">
                {event.name}
              </div>
              <div className="text-sm sm:text-sm lg:text-sm text-center mt-3">
                {event.desc}
              </div>
            </div>

            {/* submit button */}
            <div
              className="flex flex-col justify-center items-center gap-3 text-black bg-[#00ffd4] w-[300px] py-3 sm:py-0 sm:w-[200px] sm:rounded-r-2xl mb-5 sm:mb-0"
              onClick={() => handleSelect(event)}
            >
              <h1 className="text-xl sm:text-4xl font-extrabold">
                {selectedEvents.includes(event) ? (
                  <CheckCheck className="w-7 h-7 sm:w-10 sm:h-10" />
                ) : (
                  "Select"
                )}
              </h1>
            </div>

          </div>
        ))}
      </div>
      {showHackathonForm && (
        <div className="text-white text-center mt-10">
          <h2 className="text-[#00ffd4] text-4xl sm:text-6xl font-extrabold text-center">
            Hackathon Registration
          </h2>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex flex-col gap-5 mt-4 w-[80%]">
              <label className="text-2xl sm:text-4xl">
                Participation Type:
                <select
                  className="bg-black text-white"
                  name="participationType"
                  required
                  value={hackathonDetails.participationType}
                  onChange={(e) => handleFormChange(e, undefined, "hackathon")}
                >
                  <option value="solo">Solo</option>
                  <option value="team">Team</option>
                </select>
              </label>
              {hackathonDetails.team.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-5 p-7 sm:p-10 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-2xl"
                >
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => handleFormChange(e, index, "hackathon")}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={member.phone}
                    onChange={(e) => handleFormChange(e, index, "hackathon")}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => handleFormChange(e, index, "hackathon")}
                  />
                  {hackathonDetails.participationType === "team" &&
                    index > 0 && (
                      <button
                        className="bg-red-700 text-white font-bold text-2xl"
                        onClick={() => handleRemoveTeamMember(index, "hackathon")}
                      >
                        Remove
                      </button>
                    )}
                </div>
              ))}
              {hackathonDetails.participationType === "team" &&
                hackathonDetails.team.length < 4 && (
                  <button
                    className="bg-[#00ffd4] text-black font-bold text-3xl"
                    onClick={() => handleAddTeamMember("hackathon")}
                  >
                    Add Team Member
                  </button>
                )}
              <button
                className="bg-[#00ffd4] text-black font-bold text-3xl"
                onClick={() => handleSubmitForm("hackathon")}
              >
                Submit
              </button>
              {formErrors.length > 0 && (
                <div className="text-red-500 mt-4">
                  {formErrors.map((error, index) => (
                    <p key={index} className="text-2xl">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showLiveProjectsForm && (
        <div className="text-white text-center mt-10">
          <h2 className="text-[#00ffd4] text-4xl sm:text-6xl font-extrabold text-center">
            Live Projects Registration
          </h2>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex flex-col gap-5 mt-4 w-[80%]">
              <label className="text-2xl sm:text-4xl">
                Participation Type:
                <select
                  className="bg-black text-white"
                  name="participationType"
                  required
                  value={liveProjectsDetails.participationType}
                  onChange={(e) => handleFormChange(e, undefined, "liveProjects")}
                >
                  <option value="solo">Solo</option>
                  <option value="team">Team</option>
                </select>
              </label>
              {liveProjectsDetails.team.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-5 p-7 sm:p-10 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-2xl"
                >
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => handleFormChange(e, index, "liveProjects")}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={member.phone}
                    onChange={(e) => handleFormChange(e, index, "liveProjects")}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => handleFormChange(e, index, "liveProjects")}
                  />
                  {liveProjectsDetails.participationType === "team" &&
                    index > 0 && (
                      <button
                        className="bg-red-700 text-white font-bold text-2xl"
                        onClick={() => handleRemoveTeamMember(index, "liveProjects")}
                      >
                        Remove
                      </button>
                    )}
                </div>
              ))}
              {liveProjectsDetails.participationType === "team" &&
                liveProjectsDetails.team.length < 4 && (
                  <button
                    className="bg-[#00ffd4] text-black font-bold text-3xl"
                    onClick={() => handleAddTeamMember("liveProjects")}
                  >
                    Add Team Member
                  </button>
                )}
              <button
                className="bg-[#00ffd4] text-black font-bold text-3xl"
                onClick={() => handleSubmitForm("liveProjects")}
              >
                Submit
              </button>
              {formErrors.length > 0 && (
                <div className="text-red-500 mt-4">
                  {formErrors.map((error, index) => (
                    <p key={index} className="text-2xl">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showGamingTournamentForm && (
        <div className="text-white text-center mt-10">
          <h2 className="text-[#00ffd4] text-4xl sm:text-6xl font-extrabold text-center">
            Gaming Tournament Registration
          </h2>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex flex-col gap-5 mt-4 w-[80%]">
              <label className="text-2xl sm:text-4xl">
                Participation Type:
                <select
                  className="bg-black text-white"
                  name="participationType"
                  required
                  value={gamingTournamentDetails.participationType}
                  onChange={(e) => handleFormChange(e, undefined, "gamingTournament")}
                >
                  <option value="solo">Solo</option>
                  <option value="team">Team</option>
                </select>
              </label>
              {gamingTournamentDetails.team.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-5 p-7 sm:p-10 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-2xl"
                >
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => handleFormChange(e, index, "gamingTournament")}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={member.phone}
                    onChange={(e) => handleFormChange(e, index, "gamingTournament")}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => handleFormChange(e, index, "gamingTournament")}
                  />
                  {gamingTournamentDetails.participationType === "team" &&
                    index > 0 && (
                      <button
                        className="bg-red-700 text-white font-bold text-2xl"
                        onClick={() => handleRemoveTeamMember(index, "gamingTournament")}
                      >
                        Remove
                      </button>
                    )}
                </div>
              ))}
              {gamingTournamentDetails.participationType === "team" &&
                gamingTournamentDetails.team.length < 4 && (
                  <button
                    className="bg-[#00ffd4] text-black font-bold text-3xl"
                    onClick={() => handleAddTeamMember("gamingTournament")}
                  >
                    Add Team Member
                  </button>
                )}
              <button
                className="bg-[#00ffd4] text-black font-bold text-3xl"
                onClick={() => handleSubmitForm("gamingTournament")}
              >
                Submit
              </button>
              {formErrors.length > 0 && (
                <div className="text-red-500 mt-4">
                  {formErrors.map((error, index) => (
                    <p key={index} className="text-2xl">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="text-white text-center mt-10">
        <h2 className="text-[#00ffd4] text-4xl sm:text-6xl font-extrabold text-center">
          Selected Events:
        </h2>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="flex flex-col gap-5 mt-4">
            {selectedEvents.map((event, index) => (
              <h2 key={index} className="text-2xl sm:text-4xl">
                {event.name}
              </h2>
            ))}
          </div>
          <h2 className="text-[#00ffd4] text-4xl sm:text-5xl font-extrabold text-center my-10">
            Total Price: ${calculateTotalPrice()}
          </h2>
        </div>
        <button
          onClick={() => {
            console.log(selectedEvents);
            console.log(calculateTotalPrice());
          }}
          className="bg-[#00ffd4] text-3xl sm:text-6xl font-extrabold text-center text-black px-8 rounded-2xl mb-10"
        >
          Proceed
        </button>
      </div>
    </section>
    </Layout>
    </EventContainer>
  );
};


const EventContainer = styled.div`
/* .container{
  max-width:100%;
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(200px , 1fr));
  gap:1rem;
} */
`
export default Events;
