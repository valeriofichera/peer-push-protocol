import { useState } from 'react';


interface EventOption {
  value: string;
  label: string;
}

const eventOptions: EventOption[] = [
  { value: 'event1', label: 'Event 1' },
  { value: 'event2', label: 'Event 2' },
  { value: 'event3', label: 'Event 3' },
  // Add more events as needed
];

const Feed = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-center font-semibold mb-4">PICK A FEED</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="text-input" className="block text-gray-700 text-sm font-bold mb-2">
            GET CONTRACT
          </label>
          <input
            id="text-input"
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="text input"
          />
        </div>
        <div>
          <label htmlFor="select-event" className="block text-gray-700 text-sm font-bold mb-2">
            EVENTS
          </label>
          <div className="relative">
            <select
              id="select-event"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>
                select event
              </option>
              {eventOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.516 7.548c.436-.446 1.043-.481 1.576 0 .925.836 2.313.808 3.223 0a1.147 1.147 0 011.576 0c.436.446.408 1.197 0 1.615C10.313 10.96 8.689 11 7.315 9.163c-.408-.418-.436-1.17 0-1.615z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
