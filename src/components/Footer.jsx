import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { server } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Carddata } from "./";
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "newsletter"), {
        email: email.toLowerCase(),
        active: true,
        date: new Date(),
        source: window.location.href,
      });
      server.post("/api/mail/send-newsletter-confirmation", {
        name: "GuidifyMe Subscriber",
        email: email.toLowerCase(),
      });
      toast.success("Subscribed successfully! 🎉");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <footer className="bg-gradient-to-b from-primary via-primary to-white pt-8 text-sm text-center bg-primary">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap justify-between text-left lg:text-left">
          <div className="w-full px-4 text-center lg:w-5/12">
            <div>
              <Link to="/" className="flex">
                <p className="mx-auto mb-5 text-3xl font-bold text-transparent bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text md:text-4xl">
                GuidifyMe
                </p>
              </Link>
            </div>
            <div className="text-xs text-center text-white lg:text-sm">
              <p className="leading-5 md:mx-4">
              GuidifyMe is the holistic wellness mentorship platform where we
                connect the mentees with experienced, qualified and certified
                mentors across the country.
              </p>
            </div>
            <div className="py-8 space-y-8">
              <form
                onSubmit={handleSubscribe}
                className="items-center justify-center space-x-2 space-y-4 md:flex md:space-y-0"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="px-6 py-3 leading-tight border-white border text-gray-700 shadow appearance-none rounded-3xl w-54 md:w-64 focus:outline-none focus:shadow-outline"
                />
                <button className="px-6 py-2 bg-[#5789aa] text-white border-white border-2 rounded-full">
                  {!loading ? "Subscribe!" : "Subscribing..."}
                </button>
                <ToastContainer />
              </form>
            </div>
          </div>
          <div className="w-full px-4 md:w-6/12 mx-auto flex flex-wrap mb-6 items-top">
            <div className="w-full px-4 ml-auto md:w-1/2 lg:w-6/12">
              <span className="block mb-2 text-sm text-white uppercase">
                GuidifyMe
              </span>
              <ul className="text-[#dde5f1] list-unstyled space-y-4 my-6">
                <li>
                  <a href="https://GuidifyMe.com/about">About Us</a>
                </li>
                <li>
                  <a href="https://GuidifyMe.com/how">How it works</a>
                </li>
                <li>
                  <a href="https://GuidifyMe.com/join-as-mentor">
                    Join as Mentor
                  </a>
                </li>
              </ul>
            </div>
            {/* <div className="w-full px-4 ml-auto lg:w-4/12">
                <span className="block mb-2 text-sm text-white uppercase">
                  Mentorship Options
                </span>
                <ul className="text-[#dde5f1] list-unstyled space-y-3 my-6 cursor-pointer">
                  {Carddata.map((item, index) => {
                    return (
                      <li className="cursor-pointer" key={index}>
                        {" "}
                        <Link
                          key={index}
                          to={`/${item.Title}`}
                          state={{
                            Title: item.Title,
                            Background: item.Background,
                            Blog: item.Blog,
                          }}
                        >
                          {item.Title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div> */}
            <div className="w-full px-4 md:w-1/2 lg:w-4/12">
              <span className="block mb-2 text-sm text-white uppercase">
                Other Resources
              </span>
              <ul className="text-[#dde5f1] list-unstyled space-y-4 my-6 cursor-pointer">
                <li>Support</li>
                <li>Terms &amp; Conditions</li>
                <li>Privacy Policy</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6 [&>a]:p-1 [&>a]:bg-white [&>a]:rounded-full">
          <a href="https://www.linkedin.com/company/GuidifyMe/">
            <FaLinkedin style={{ color: "#1DA1F2" }} size={25} />
          </a>
          <a href="https://instagram.com/GuidifyMe_forlife">
            <FaInstagram style={{ color: "#C13584" }} size={25} />
          </a>
          <a href="https://x.com/GuidifyMe">
            <FaXTwitter size={25} />
          </a>
          <a href="https://youtube.com/@GuidifyMeOfficial">
            <FaYoutube style={{ color: "#CD201F" }} size={25} />
          </a>
        </div>
      </div>

      <hr className="mt-6 bg-white border-0 h-[1.5px]" />

      <div className="flex bg-primary py-6 flex-wrap items-center justify-center md:justify-between">
        <div className="w-full px-4 mx-auto text-center md:w-4/12">
          <div className="py-1 text-sm text-white">
            ©<span className="mx-1">{year}</span>
            <a href="/">GuidifyMe Community</a>
            <span className="mx-1">|</span>
            <a href="https://GuidifyMe.com">GuidifyMe</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
