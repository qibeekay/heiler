import React from 'react';
import {
	Popover,
	PopoverHandler,
	PopoverContent,
} from '@material-tailwind/react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { TbCalendarStats } from 'react-icons/tb';

interface DatePickerProps {
	selectedDate: string;
	onDateChange: (selectedDate: string) => void;
}

export default function DatePicker({
	selectedDate,
	onDateChange,
}: DatePickerProps) {
	const [date, setDate] = React.useState<Date>();

	// Function to handle date selection and format it
	const handleDateSelect = (selected: Date | undefined) => {
		if (selected) {
			const formattedDate = format(selected, 'dd/MM/yyyy');
			setDate(selected);
			onDateChange(formattedDate); // Pass the formatted date to the parent component
		}
	};

	return (
		<div>
			<Popover placement='bottom'>
				<PopoverHandler>
					<div className='w-full flex items-center justify-between font-normal text-[#858585] text-lg p-4 bg-bgGreen border border-[#C2C8D0]/60 rounded-lg  cursor-pointer'>
						<input
							className=' bg-transparent placeholder:text-[#858585] outline-none cursor-pointer'
							placeholder='Select a Date'
							onChange={(e) => onDateChange(e.target.value)}
							value={selectedDate}
							// disabled
							// crossOrigin={undefined}
						/>
						<TbCalendarStats className='mr-2 h-6 w-6 text-greens/50' />
					</div>
				</PopoverHandler>
				<PopoverContent>
					<DayPicker
						mode='single'
						selected={date}
						onSelect={handleDateSelect}
						showOutsideDays
						className='border-0'
						classNames={{
							caption: 'flex justify-center py-2 mb-4 relative items-center',
							caption_label: 'text-sm font-medium text-gray-900',
							nav: 'flex items-center',
							nav_button:
								'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
							nav_button_previous: 'absolute left-1.5',
							nav_button_next: 'absolute right-1.5',
							table: 'w-full border-collapse',
							head_row: 'flex font-medium text-gray-900',
							head_cell: 'm-0.5 w-9 font-normal text-sm',
							row: 'flex w-full mt-2',
							cell: 'text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
							day: 'h-9 w-9 p-0 font-normal',
							day_range_end: 'day-range-end',
							day_selected:
								'rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white',
							day_today: 'rounded-md bg-gray-200 text-gray-900',
							day_outside:
								'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
							day_disabled: 'text-gray-500 opacity-50',
							day_hidden: 'invisible',
						}}
						components={{
							IconLeft: ({ ...props }) => (
								<ChevronLeftIcon {...props} className='h-4 w-4 stroke-2' />
							),
							IconRight: ({ ...props }) => (
								<ChevronRightIcon {...props} className='h-4 w-4 stroke-2' />
							),
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
