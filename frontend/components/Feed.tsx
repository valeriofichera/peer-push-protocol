import { useState } from 'react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
          <Input
            id="text-input"
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Contract Address"
          />
        </div>
        <div>
          <label htmlFor="select-event" className="block text-gray-700 text-sm font-bold mb-2">
            EVENTS
          </label>
          <Select>
            <SelectTrigger className="w-full px-4 py-2 bg-white border border-gray-400 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              {/* Use SelectItem for each event you have */}
              <SelectItem value="event1">Event 1</SelectItem>
              <SelectItem value="event2">Event 2</SelectItem>
              <SelectItem value="event3">Event 3</SelectItem>
              {/* ... other items */}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Feed;
