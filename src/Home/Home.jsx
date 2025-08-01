// ...existing imports...
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const LIMIT = 9;

function Home() {
  const [offers, setOffers] = useState([]);
  const [current, setCurrent] = useState(0);

  // Restaurant state variables
  const [restaurants, setRestaurants] = useState([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch carousel offers
  useEffect(() => {
    async function fetchOffers() {
      try {
        const response = await fetch('https://apis.ccbp.in/restaurants-list/offers');
        const data = await response.json();
        setOffers(data.offers || []);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setOffers([]);
      }
    }
    fetchOffers();
  }, []);

  // Fetch restaurants
  useEffect(() => {
    async function fetchRestaurants() {
      setLoading(true);
      try {
        const response = await fetch(`https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}`);
        const data = await response.json();
        setRestaurants(data.restaurants || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setRestaurants([]);
        setTotal(0);
      }
      setLoading(false);
    }
    fetchRestaurants();
  }, [offset]);

  // Carousel navigation
  const nextSlide = () => setCurrent((prev) => (prev + 1) % offers.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + offers.length) % offers.length);
  const goToSlide = (idx) => setCurrent(idx);

  // Pagination
  const totalPages = Math.ceil(total / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;
  const goToPage = (page) => setOffset((page - 1) * LIMIT);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-1 flex flex-col items-center px-2 md:px-0">
        {/* Carousel */}
        <div className="w-full max-w-3xl mt-8 mb-8 relative">
          {offers.length > 0 && (
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={offers[current].image_url}
                alt="offer"
                className="w-full h-64 object-cover"
              />
              {/* Carousel controls */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                aria-label="Previous"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                aria-label="Next"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {offers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-3 h-3 rounded-full border border-white ${current === idx ? 'bg-[#f59e0b]' : 'bg-white/60'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Popular Restaurants */}
        <section className="w-full max-w-5xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#1e293b]">Popular Restaurants</h2>
              <p className="text-[#64748b] text-sm">Select Your favourite restaurant special dish and make your day happy...</p>
            </div>
            <div className="mt-2 md:mt-0">
              <select className="border rounded px-2 py-1 text-sm text-[#1e293b]">
                <option>Sort by Lowest</option>
                {/* Add more sort options if needed */}
              </select>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-10 text-[#64748b]">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {restaurants.map((rest) => (
                <div key={rest.id} className="bg-white rounded-lg shadow p-3 flex flex-col">
                  <img src={rest.image_url} alt={rest.name} className="w-full h-32 object-cover rounded-md mb-2" />
                  <div className="font-semibold text-[#1e293b]">{rest.name}</div>
                  <div className="text-xs text-[#64748b] mb-1">{rest.cuisine}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      <span className="text-[#f59e0b] font-bold">{rest.user_rating.rating}</span>
                    </span>
                    <span className="text-[#64748b]">({rest.user_rating.total_reviews} ratings)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded border bg-white text-[#1e293b] disabled:opacity-50"
            >
              {'<'}
            </button>
            <span className="mx-2 text-[#1e293b]">{currentPage} / {totalPages}</span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded border bg-white text-[#1e293b] disabled:opacity-50"
            >
              {'>'}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;