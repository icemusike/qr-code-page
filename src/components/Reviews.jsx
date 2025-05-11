import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ name, role, review, avatar }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="flex items-center mb-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4 object-cover" />
      <div>
        <h4 className="font-semibold text-neutral-dark">{name}</h4>
        <p className="text-sm text-neutral">{role}</p>
      </div>
    </div>
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-accent fill-accent" />)}
    </div>
    <p className="text-neutral-dark italic">"{review}"</p>
  </div>
);

const Reviews = () => {
  const reviewData = [
    { name: 'Sarah L.', role: 'Marketing Manager', review: 'This QR generator is a game-changer for our campaigns! So easy to use and customize.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'John B.', role: 'Small Business Owner', review: 'I love how quickly I can create WiFi QR codes for my customers. The free plan is fantastic!', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'Alice M.', role: 'Event Organizer', review: 'Used it for event tickets and check-ins. Flawless performance and great customization options.', avatar: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  ];

  return (
    <section id="reviews" className="py-12 md:py-20 bg-neutral-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10 md:mb-16">
          Loved by Users Worldwide
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewData.map((r, i) => <ReviewCard key={i} {...r} />)}
        </div>
      </div>
    </section>
  );
};
export default Reviews;
