'use client';
import { useRef } from "react";
import dayjs from "dayjs";
import { Wifi, Bath, Utensils, Wind, Tv, Car, Droplet, Refrigerator, Sofa, Armchair, DoorOpen, Waves, Key, Menu, Phone, MapPin, Fan, Cctv } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/HomepageFooter";

export default function Home() {
  // Create refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const amenitiesRef = useRef(null);
  const packagesRef = useRef(null);
  const bookingsRef = useRef(null);

  // Scroll function using refs
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const amenities = [
    { name: "Free Wi-Fi", icon: Wifi },
    { name: "Bathroom", icon: Bath },
    { name: "Kitchenette", icon: Utensils },
    { name: "Air conditioning", icon: Wind },
    { name: "Television", icon: Tv },
    { name: "Parking", icon: Car },
    { name: "Water heater", icon: Droplet },
    { name: "Refrigerator", icon: Refrigerator },
    { name: "Wardrobe", icon: Armchair }, // used for closet/wardrobe
    { name: "Sofa", icon: Sofa },
    { name: "Balcony", icon: DoorOpen }, // open space / entry
    { name: "Fan", icon: Fan },
    { name: "Swimming pool", icon: Waves },
    { name: "24 Hour Surveillace", icon: Cctv },
  ];

  const currentYear = dayjs().year();
  const nextYear = dayjs().add(1, "year").year();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div ref={homeRef} id="home" className="hero min-h-screen relative"
        style={{ backgroundImage: 'url(/sal-hostel-frontview.png)' }}>

        {/* Gradient Overlay */}
        <div className="hero-overlay bg-opacity-50 bg-gradient-to-b from-blue-500/20 to-red-400/20"></div>

        {/* Navbar - Fixed */}
        <div className="navbar fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 bg-black/20 backdrop-blur-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="cursor-pointer hover:opacity-65 active:opacity-100 lg:hidden text-white">
                <Menu size={24} />
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => scrollToSection(homeRef)}>Home</a></li>
                <li><a onClick={() => scrollToSection(aboutRef)}>About</a></li>
                <li><a onClick={() => scrollToSection(amenitiesRef)}>Amenities</a></li>
                <li><a onClick={() => scrollToSection(packagesRef)}>Packages</a></li>
                <li><a onClick={() => scrollToSection(bookingsRef)}>Bookings</a></li>
                <li><a onClick={() => scrollToSection(newsRef)}>News</a></li>
              </ul>
            </div>
            <div className="mx-4">
              <Image
                src="/logo.webp"
                alt="sal hostel logo"
                height={80}
                width={100}
              />
            </div>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white gap-2">
              <li><a onClick={() => scrollToSection(homeRef)} className="hover:bg-white/20 cursor-pointer">Home</a></li>
              <li><a onClick={() => scrollToSection(aboutRef)} className="hover:bg-white/20 cursor-pointer">About</a></li>
              <li><a onClick={() => scrollToSection(amenitiesRef)} className="hover:bg-white/20 cursor-pointer">Amenities</a></li>
              <li><a onClick={() => scrollToSection(packagesRef)} className="hover:bg-white/20 cursor-pointer">Packages</a></li>
              <li><a onClick={() => scrollToSection(bookingsRef)} className="hover:bg-white/20 cursor-pointer">Bookings</a></li>
              <li><a onClick={() => scrollToSection(newsRef)} className="hover:bg-white/20 cursor-pointer">News</a></li>
            </ul>
          </div>

          <div className="navbar-end">
            <Link href="/signIn">
              <button className="bg-red-500 p-2 rounded cursor-pointer hover:bg-red-400 active:bg-red-500 active:scale-95 text-white">Sign In</button>
            </Link>
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-content text-center text-white">
          <div className="max-w-5xl">
            <h1 className="mb-5 text-3xl lg:text-7xl font-bold tracking-wide">
              KNUST OBUASI CAMPUS-GHANA
            </h1>
            <h2 className="mb-5 text-xl lg:text-4xl font-semibold">
              OPEN FOR BOOKINGS FOR {currentYear}/{nextYear} ACADEMIC YEAR
            </h2>
            <div className="divider divider-neutral"></div>
            <p className="text-xl mb-2">FOR ENQUIRIES, CALL</p>
            <p className="text-3xl font-bold flex items-center justify-center gap-2">
              <Phone className="animate-pulse" /> +233 54 476 2415
            </p>
          </div>
        </div>
      </div>

      {/* About Section (General Information) */}
      <section ref={aboutRef} id="about" className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-12">General Information</h2>
          <div className="prose prose-lg mx-auto text-white/90 text-center max-w-none">
            <p className="mb-6">
              The hostel complex is conceptualized as a 4-block with 4-floors of 32 rooms each sited on 2.55 acres of land
              with a capacity to accommodate 256 students on completion. The hostel comes with spacious room sizes of 19
              square meters as standard. The project is being built in 4 phases.
            </p>
            <p>
              The first phase is made up of 32 rooms on 4 floors with each room having its private balcony, en-suite
              bathroom fitted with a water closet, shower, and water heater(optional). Each room is also fitted with a
              wardrobe and kitchenette. Air-conditioned rooms are also available as an option for students.
            </p>
          </div>
        </div>
      </section>

      {/* Amenities Section (Facilities) */}
      <section ref={amenitiesRef} id="amenities" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-12">Facilities & Amenities</h2>

          <p className="text-lg text-center leading-relaxed max-w-4xl mx-auto mb-12">
            There is an onsite commercial facility which houses the study room, cafeteria, grocery, and pharmacy to cater
            for the needs of students. The hostel is monitored 24-hours by the dedicated security to ensure the safety
            and security of residents.
          </p>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">{amenity.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section ref={packagesRef} id="packages" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-3">Packages</h2>
          <p className="text-center mb-12">Choice of Rooms</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 2 in a room */}
            <div className="card lg:card-side bg-base-100 shadow-sm">
              <figure>
                <Image
                  src="/2room.jpg"
                  alt="2 in a room picture"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Two in a Room</h2>
                <p>You have the option of choosing your roomate. *</p>
              </div>
            </div>

            {/* 4 in a room */}
            <div className="card lg:card-side bg-base-100 shadow-sm">
              <figure>
                <Image
                  src="/4room.png"
                  alt="4 in a room picture"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Four in a Room</h2>
                <p>You have the option of choosing your roomate. *</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bookings Section */}
      <section ref={bookingsRef} id="bookings" className="py-20 px-4 bg-gradient-to-br from-red-400 to-blue-800 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-5xl font-bold mb-8">Ready to Book?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Secure your accommodation for the upcoming academic year. Limited rooms available!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking/academic-year">
              <button className="text-white bg-red-500 p-3 rounded cursor-pointer hover:bg-red-400 active:bg-red-500">Book Academic Year</button>
            </Link>
            <Link href="/booking/short-stay">
              <button className="text-white bg-red-500 p-3 rounded cursor-pointer hover:bg-red-400 active:bg-red-500">Book Short Stay</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-12">Location</h2>
          <p className="text-lg text-center leading-relaxed max-w-4xl mx-auto mb-8">
            The hostel is conveniently sited adjacent to the Mother's Love Basic School, and it is 5.6km to the KNUST
            Obuasi campus and 12minutes drive by road. The facility is 300 meters from the main Kumasi-Obuasi highway.
            The hostel provides shuttle services (at a fee) for students to commute to the KNUST Obuasi campus and back
            to the hostel.
          </p>

          {/* Optional: Add a map here */}
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <MapPin className="w-16 h-16 text-gray-600" />
            <span className="ml-2 text-gray-600">Map</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}