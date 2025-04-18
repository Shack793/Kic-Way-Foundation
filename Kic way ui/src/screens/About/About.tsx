import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { AuthForm } from "../../components/auth/AuthForm";
import { Login } from "../../components/auth/Login";

export const About = (): JSX.Element => {
  useEffect(() => {
    console.log("About component mounted");
  }, []);

  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Navigation items data
  const navItems = [
    { text: "HOME", href: "/" },
    { text: "ABOUT US", href: "/about" },
    { text: "TEAM", href: "#" },
    { text: "INITIATIVES", href: "#" },
    { text: "GET INVOLVED", href: "#" },
    { text: "EVENTS", href: "#" },
    { text: "CONTACT US", href: "#" },
  ];

  // Core beliefs data
  const coreBeliefs = [
    "Shoes Are Just the Start – A new pair of kicks brings energy, excitement, and hope to a child's life.",
    "Immediate Help, Global Reach – Whether it's a local school in need or an international orphanage in crisis, we respond swiftly.",
    "Every Step Matters – Every child deserves a solid foundation under their feet—physically and emotionally.",
  ];

  // Why shoes data
  const whyShoes = [
    "Behavioral problems",
    "Low self-esteem",
    "Poor school attendance",
    "Higher risk of illness and injury",
    "Chronic stress and bullying",
  ];

  // Footer links data
  const footerLinks1 = [
    "HOME",
    "ABOUT US",
    "LEADERS",
    "OUR PARTNERS",
    "PROGRAMS & INITIATIVES",
  ];

  const footerLinks2 = [
    "EVENTS & CONFERENCES",
    "NEWS & UPDATES",
    "CONTACT US",
    "DONATE / SUPPORT",
    "MEMBER PORTAL",
  ];

  return (
    <main className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-full max-w-[1512px] relative">
        {/* Hero Section */}
        <section className="relative w-full h-[822px]">
          <div className="absolute w-full h-[604px] top-[33px] left-0 bg-[#f9ce50]" />

          <h1 className="absolute w-[349px] top-[345px] left-[187px] [font-family:'Koulen',Helvetica] font-normal text-black text-[40px] tracking-[0] leading-5">
            ABOUT US
          </h1>

          <img
            className="absolute w-[247px] h-[105px] top-[109px] left-[123px] object-cover"
            alt="KIC Way Foundation Logo"
            src="/untitled-design--7--1.png"
          />

          <div className="absolute w-full h-[100px] top-0 left-0 bg-[#006839]" />

          <p className="absolute top-[39px] left-[813px] [font-family:'Afacad',Helvetica] font-normal text-xl tracking-[0] leading-[50px] whitespace-nowrap">
            <span className="font-bold text-white">
              "Every Child Deserves a Journey.&nbsp;&nbsp;
            </span>
            <span className="font-bold italic text-[#f9ce50]">
              Every Journey Deserves a Pair of Shoes."
            </span>
          </p>

          <div className="absolute flex gap-2 top-[581px] left-[184px]">
            <img
              className="w-[269px] h-[188px]"
              alt="Children receiving shoes"
              src="/image-4.png"
            />
            <img
              className="w-[220px] h-[294px] mt-[-53px]"
              alt="Child with new shoes"
              src="/image-5.png"
            />
            <img
              className="w-[252px] h-[211px] mt-[-23px]"
              alt="Children with volunteers"
              src="/image-6.png"
            />
            <img
              className="w-[307px] h-[211px] mt-[-23px]"
              alt="Group of children with shoes"
              src="/image-7.png"
            />
          </div>

          <Separator className="absolute w-[186px] h-[5px] top-[315px] left-[184px] bg-black" />

          <p className="absolute top-[397px] left-[184px] [font-family:'Afacad',Helvetica] font-normal text-black text-4xl tracking-[0] leading-[35px]">
            <span className="[font-family:'Afacad',Helvetica] font-normal text-black text-4xl tracking-[0] leading-[35px]">
              We envision a world where{" "}
            </span>
            <span className="font-bold">no child walks barefoot</span>
            <span className="[font-family:'Afacad',Helvetica] font-normal text-black text-4xl tracking-[0] leading-[35px]">
              {" "}
              through hardship, <br />
              bringing communities together to support children and families{" "}
            </span>
            <span className="font-bold">across the globe.</span>
          </p>

          {/* Navigation */}
          <nav className="absolute w-[954px] h-10 top-[142px] left-[450px] flex items-center">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="mr-6 [font-family:'Koulen',Helvetica] font-normal text-black text-2xl tracking-[0] leading-5 whitespace-nowrap"
              >
                {item.text}
              </a>
            ))}
            <Button 
              className="h-10 w-[156px] bg-[#006839] rounded-none [font-family:'Koulen',Helvetica] font-normal text-white text-2xl tracking-[0] leading-5 mr-4"
              onClick={() => setShowAuthForm(true)}
            >
              REGISTER
            </Button>
            <Button 
              className="h-10 w-[156px] bg-[#006839] rounded-none [font-family:'Koulen',Helvetica] font-normal text-white text-2xl tracking-[0] leading-5"
              onClick={() => setShowLoginForm(true)}
            >
              LOGIN
            </Button>
          </nav>
        </section>

        {/* Mission Section */}
        <section className="mt-[83px] px-[181px]">
          <h2 className="w-[878px] [font-family:'Kreon',Helvetica] font-semibold text-black text-5xl tracking-[0] leading-[30px]">
            Kicking off Hope, One step at a Time
          </h2>

          <div className="mt-[87px] w-full max-w-[1091px] [font-family:'Afacad',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[35px]">
            <p>
              At the KIC Way Foundation, we believe every child deserves the
              dignity of a new pair of shoes—and the chance to walk confidently
              toward their future.
            </p>
            <p className="mt-8">
              Founded by Dr. Eric D. Garnes, KIC (Kingdom International
              Consortium) Way Foundation exists to meet the urgent needs of
              children and families in crisis, both locally and globally. From
              inner cities in the U.S. to underserved communities around the
              world, our mission is simple yet urgent:
              <br />
              "A child in need cannot wait."
            </p>
            <p className="mt-8">
              We are a faith-driven, people-powered foundation inspired by the
              belief that small acts of love—like providing shoes—can spark big
              transformations in the lives of children. When kids don't have
              shoes, it affects far more than their feet. It impacts their
              health, confidence, behavior, and access to education. It
              increases their risk of bullying, stress, and dropout.
            </p>
            <p className="mt-8">
              That's why we move fast. We partner with donors, volunteers,
              schools, churches, and corporate sponsors to ensure no child is
              left behind.
            </p>
          </div>
        </section>

        {/* Core Beliefs Section */}
        <section className="mt-[120px] px-[181px]">
          <h2 className="w-[878px] [font-family:'Kreon',Helvetica] font-semibold text-black text-5xl tracking-[0] leading-[30px]">
            Our Core Beliefs
          </h2>

          <ul className="mt-[60px] space-y-4 [font-family:'Afacad',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[35px]">
            {coreBeliefs.map((belief, index) => (
              <li key={index}>{belief}</li>
            ))}
          </ul>

          <div className="mt-[60px] w-full">
            <img
              className="w-full h-[850px] object-cover"
              alt="Our core beliefs"
              src="/our-core-beliefs--3--1.png"
            />

            <div className="flex justify-center mt-[-120px]">
              <Button className="w-[339px] h-[55px] bg-[#006839] rounded-none [font-family:'Koulen',Helvetica] font-normal text-white text-2xl tracking-[0] leading-5">
                FIND OUT MORE ABOUT GIVING
              </Button>
            </div>
          </div>
        </section>

        {/* Why Shoes Section */}
        <section className="mt-[60px] w-full h-[850px] bg-[url(/our-core-beliefs--4--1.png)] bg-cover bg-center flex items-center">
          <div className="px-[158px]">
            <h2 className="w-[484px] [font-family:'Koulen',Helvetica] font-normal text-white text-5xl tracking-[0] leading-5">
              WHY SHOES?
            </h2>

            <div className="mt-[66px] w-[633px] [font-family:'Kreon',Helvetica] font-normal text-white text-[32px] tracking-[0] leading-[45px]">
              <p>
                Did you know that over 300 million children worldwide do not
                have shoes?
              </p>
              <p className="mt-4">Shoelessness can lead to:</p>
              <ul className="mt-2">
                {whyShoes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">
                We're changing that—one child, one pair at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Parent Organization Section */}
        <section className="w-full">
          <img
            className="w-full h-[455px] object-cover"
            alt="Visit our parent organization"
            src="/visit-our-parent-body--2--1.png"
          />
        </section>

        {/* Footer Section */}
        <footer className="w-full h-[852px] bg-[url(/our-core-beliefs--9-.png)] bg-cover bg-center relative">
          <div className="absolute top-[539px] left-[812px] [font-family:'Instrument_Sans',Helvetica] font-semibold text-[#fffcfc] text-sm tracking-[0] leading-[35px]">
            {footerLinks1.map((link, index) => (
              <a 
                key={index} 
                href={link === "HOME" ? "/" : link === "ABOUT US" ? "/about" : "#"} 
                className="block"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="absolute top-[534px] left-[1118px] [font-family:'Instrument_Sans',Helvetica] font-semibold text-[#fffcfc] text-sm tracking-[0] leading-[35px]">
            {footerLinks2.map((link, index) => (
              <a key={index} href="#" className="block">
                {link}
              </a>
            ))}
          </div>

          <div className="absolute top-[746px] left-[1115px] [font-family:'Instrument_Sans',Helvetica] font-semibold text-[#fffcfc] text-sm text-right tracking-[0] leading-5 whitespace-nowrap">
            DESIGNED BY BOX BREAKER GLOBAL
          </div>

          <address className="absolute w-[250px] top-[699px] left-[269px] [font-family:'Instrument_Sans',Helvetica] font-semibold text-[#fffcfc] text-sm tracking-[0] leading-5 not-italic">
            THEKICWAY.COM
            <br />
            1274 UTICA AVENUE
            <br />
            BROOKLYN, NY 11203
            <br />
            USA
          </address>

          <div className="absolute top-[531px] left-[104px] flex">
            <img
              className="w-[152px] h-[165px]"
              alt="KIC Way Foundation Logo"
              src="/untitled-design--7--4.png"
            />
            <img
              className="w-[206px] h-[165px]"
              alt="KIC Way Foundation Logo"
              src="/untitled-design--7--3.png"
            />
          </div>
        </footer>

        {showAuthForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#006839]">Register</h2>
                <button 
                  onClick={() => setShowAuthForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <AuthForm />
            </div>
          </div>
        )}

        {showLoginForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#006839]">Login</h2>
                <button 
                  onClick={() => setShowLoginForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <Login />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
// Replace the navigation container with this fixed version
<div className="fixed top-4 left-4 z-50 flex space-x-2">
  <button
    data-login-button
    onClick={() => setShowLoginForm(true)}
    className="bg-[#006839] hover:bg-[#005830] text-white font-bold py-2 px-4 rounded"
  >
    Login
  </button>
  <button
    data-register-button
    onClick={() => setShowAuthForm(true)}
    className="bg-white hover:bg-gray-100 text-[#006839] font-bold py-2 px-4 rounded border border-[#006839]"
  >
    Register
  </button>
</div>


