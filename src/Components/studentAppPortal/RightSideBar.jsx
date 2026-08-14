import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetfetchFeaturedPartners,
  GetWebinars,
} from "../../Features/Admin_Features/AdminSlice";
import { useNavigate } from "react-router";
import { FaClock, FaVideo } from "react-icons/fa";

export default function RightSideBar({ onOpenWebinarModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [webinars, setWebinars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [featuredPartners, setFeaturedPartners] = useState([]);

  const [blogs] = useState([
    {
      id: 1,
      title: "How I Got Accepted Into My Dream University",
      postedAt: "12 Mar 2026",
      postedBy: "Sarah Ahmed",
    },
    {
      id: 2,
      title: "Top 5 Tips for Writing a Strong Personal Statement",
      postedAt: "09 Mar 2026",
      postedBy: "Admin Team",
    },
    {
      id: 3,
      title: "What to Expect During Your Student Visa Interview",
      postedAt: "05 Mar 2026",
      postedBy: "James Carter",
    },
  ]);
  useEffect(() => {
    if (!webinars?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % webinars.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, [webinars]);

  useEffect(() => {
    dispatch(GetWebinars())
      .unwrap()
      .then((res) => {
        if (res) {
          setWebinars(res);
        }
      });
  }, []);

  useEffect(() => {
    dispatch(GetfetchFeaturedPartners())
      .unwrap()
      .then((res) => {
        if (res) {
          setFeaturedPartners(res);
        }
      });
  }, []);
  return (
    <aside className="w-80 bg-white border-l border-slate-200 hidden xl:flex flex-col gap-6 z-30 flex-shrink-0 h-screen overflow-y-auto p-6 scrollbar-hide">
      {/* Free Applications */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-xl shadow-blue-100 text-white relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl" />
        <div className="flex justify-between text-xs font-bold mb-3 relative z-10">
          <span>Free Applications</span>
          <span>3/3</span>
        </div>
        <div className="w-full bg-black/20 h-2 rounded-full relative z-10">
          <div className="bg-white h-2 rounded-full w-full transition-all duration-700 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        </div>
        <p className="text-[10px] mt-3 text-blue-100 relative z-10">
          Upgrade to Premium for unlimited applications.
        </p>
      </div> */}

      {/* Featured Partners */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Featured Partners
          </span>
          <span className="bg-slate-100 text-slate-400 text-[9px] font-bold px-1.5 rounded border border-slate-200">
            Ads
          </span>
        </div>

        <div className="space-y-4">
          {featuredPartners?.length > 0 &&
            featuredPartners?.map((partner) => {
              return (
                <div
                  onClick={() =>
                    navigate(
                      `/student/apply-to-university/universities/${partner?.university_id}`,
                    )
                  }
                  key={partner?.partner_id}
                  className="bg-white border border-slate-200 rounded-2xl p-3 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                      {partner?.university_image ? (
                        <img
                          src={partner?.university_image}
                          alt={partner?.university_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold text-sm bg-blue-50">
                          {partner?.university_name
                            ?.split(" ")
                            ?.slice(0, 2)
                            ?.map((word) => word[0])
                            ?.join("")}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {partner?.university_name}
                      </div>

                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[11px] text-slate-500 truncate">
                          {partner?.university_country}
                        </span>

                        {partner?.qs_ranking && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100">
                            QS #{partner?.qs_ranking}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Upcoming Event */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Upcoming Event
          </span>
        </div>

        {webinars?.length > 0 &&
          webinars?.map((webinar, index) => {
            if (index !== currentIndex) return null;

            return (
              <div
                key={index}
                onClick={() => onOpenWebinarModal(webinar)}
                className="bg-white rounded-2xl p-1 shadow-md border border-slate-100 group cursor-pointer hover:-translate-y-1 transition duration-300"
              >
                <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-5 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-bl-full -mr-10 -mt-10 z-0 opacity-50" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1 ${
                          webinar?.status === "live"
                            ? "bg-red-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {webinar?.status === "live" ? <FaVideo /> : <FaClock />}
                        {webinar?.status?.toUpperCase()}
                      </span>

                      <span className="text-xs font-bold text-slate-400">
                        {webinar?.date}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 leading-tight text-base mb-1">
                      {webinar?.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {webinar?.descriptive_title}
                    </p>
                    <p className="text-xs text-slate-500">{webinar?.speaker}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <img
                          className="w-7 h-7 rounded-full border-2 border-white"
                          src="https://i.pravatar.cc/100?img=1"
                          alt="speaker 1"
                        />
                        <img
                          className="w-7 h-7 rounded-full border-2 border-white"
                          src="https://i.pravatar.cc/100?img=2"
                          alt="speaker 2"
                        />
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 text-[9px] flex items-center justify-center font-bold text-slate-500 shadow-sm">
                          {webinar?.registered - 1 > 0
                            ? webinar?.registered - 1
                            : 0}
                          +
                        </div>
                      </div>

                      <button
                        type="button"
                        className="text-slate-900 text-xs font-bold hover:text-blue-600 transition"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Free Consultation */}
      {/* <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Free Consultation
          </span>
          <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-1.5 rounded border border-emerald-100">
            1:1
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Book Your Free Consultation
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Get guidance on universities, programs, and applications.
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
              <FaVideo className="text-emerald-600 text-sm" />
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              University shortlisting
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Application strategy
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Visa & document guidance
            </div>
          </div>

          <button
            onClick={() => navigate("/student/book-consultation")}
            className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            Book Free Session
          </button>

          <p className="text-[10px] text-slate-400 text-center mt-2">
            No credit card required
          </p>
        </div>
      </div> */}

      {/* Student Insights */}
      {/* <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Student Insights
          </span>
        </div>

        <div className="space-y-2">
          {blogs?.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/student/blogs/${blog.id}`)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 hover:shadow-sm hover:border-blue-200 transition-all cursor-pointer group"
            >
              <h3 className="text-[13px] font-semibold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                {blog.title}
              </h3>

              <div className="mt-1.5 flex items-center justify-between gap-2 text-[10px] text-slate-500">
                <span className="truncate">By {blog.postedBy}</span>
                <span className="whitespace-nowrap">{blog.postedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Spotlight */}
      {/* <div>
        <div className="flex items-center gap-2 mb-3">
          <i className="fas fa-bolt text-yellow-500 text-sm" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Spotlight
          </span>
        </div>

        <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer shadow-md transition-all hover:shadow-xl hover:scale-[1.02]">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
            alt="Spotlight"
            className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />

          <div className="absolute top-4 left-4 z-10 flex gap-1">
            <span className="bg-yellow-500 text-white text-[9px] font-bold px-2 py-1 rounded shadow-lg">
              SCHOLARSHIP
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-base font-bold leading-tight mb-1">
              Intro to AI & ML
            </h3>
            <p className="text-xs text-slate-300 mb-3">Stanford University</p>
            <button
              type="button"
              className="w-full py-2 bg-white/10 backdrop-blur text-white border border-white/20 text-xs font-bold rounded-lg hover:bg-white hover:text-slate-900 transition"
            >
              View Course
            </button>
          </div>
        </div>
      </div> */}
    </aside>
  );
}
