import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await fetch(
        "http://localhost:4000/api/v1/email/send/mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
          credentials: "include",
        }
      );
      setName("");
      setEmail("");
      setMessage("");
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="bg-gray-300 dark:bg-[#141414] py-14">
      <h2 className="text-5xl text-center font-extrabold text-gray-900 dark:text-gray-300 mb-3">
        Contact <span className="text-[#1E90FF]">Us</span>
      </h2>
      <p className="text-gray-700 max-w-2xl mx-auto  text-center dark:text-gray-400 mb-10">
        Have questions or need assistance? We're here to help! Get in touch with
        us today.
      </p>

      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Image */}

        {/* Right Side - Contact Form & Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Have any questions? We'd love to hear from you.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-4">
              <Mail className="text-[#1E90FF]" size={24} />
              <span className="text-gray-700 dark:text-gray-300">
                contact@brainboosters.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-[#1E90FF]" size={24} />
              <span className="text-gray-700 dark:text-gray-300">
                +91 98765 43210
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-[#1E90FF]" size={24} />
              <span className="text-gray-700 dark:text-gray-300">
                Dharamshala, India
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <form className="mt-6 space-y-4" onSubmit={sendMail}>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-none focus:outline-2 focus:outline-blue-500"
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              placeholder="Your Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-none focus:ring-2 focus:ring-blue-500 outline-none p-2 w-full rounded-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-[#1E90FF] hover:bg-[#1E90FF] transition py-2 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="hidden md:block">
          <img
            src="contact.jpg"
            alt="Contact Illustration"
            className="w-full h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
