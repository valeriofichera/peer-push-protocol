import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button';

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
    <>
    

<div className="grid grid-cols-5 gap-4 p-4 bg-pink-100">
{/* This spans all 5 columns */}
<h2 className="col-span-5 text-center text-4xl font-bold uppercase text-black">
  Create a feed
</h2>

{/* Label spans 2 columns, input spans 3 */}
<div className="col-span-2 flex justify-end items-center">
  <label htmlFor="contract" className="font-semibold text-black">
    Get Contract
  </label>
</div>
<div className="col-span-3">
  <input
    id="contract"
    type="text"
    placeholder="input Contract Address"
    className="w-full py-2 px-4 rounded shadow-lg text-gray-700 focus:outline-none"
  />
</div>

{/* Label spans 2 columns, select dropdown spans 3 */}
<div className="col-span-2 flex justify-end items-center">
  <label htmlFor="events" className="font-semibold text-black">
    Events
  </label>
</div>
<div className="col-span-3 relative">
  <select
    id="events"
    className="w-full py-2 px-4 rounded shadow-lg text-gray-700 focus:outline-none appearance-none bg-white"
  >
    <option value="getFunction">getFunction</option>
    {/* Add more options as necessary */}
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M5.516 7.548c.436-.446 1.043-.481 1.576 0 .925.836 2.313.808 3.223 0a1.147 1.147 0 011.576 0c.436.446.408 1.197 0 1.615C10.313 10.96 8.689 11 7.315 9.163c-.408-.418-.436-1.17 0-1.615z" />
    </svg>
  </div>
</div>

{/* Button spans all 5 columns */}
<Button >
  Register Request
</Button>
</div>
</>

  );
};

export default Feed;



