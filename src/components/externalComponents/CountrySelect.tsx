import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { LuChevronsUpDown } from 'react-icons/lu';
import clsx from 'clsx';
import { useState } from 'react';
import { useCountries } from 'use-react-countries';

interface Country {
	name: string;
	countryCallingCode: string;
	flags: {
		png: string;
		svg: string;
	};
}
const CountrySelect = () => {
	const { countries } = useCountries();
	// Sort the countries array alphabetically by name
	const sortedCountries = countries
		.slice()
		.sort((a: Country, b: Country) => a.name.localeCompare(b.name));

	const [selectedCountries, setSelectedCountries] = useState<Country | null>(
		sortedCountries[0]
	);

	const [query, setQuery] = useState('');

	const filteredCountries =
		query === ''
			? sortedCountries
			: sortedCountries.filter((country: Country) => {
					return country.name.toLowerCase().includes(query.toLowerCase());
			  });

	return (
		<div className='w-full'>
			<Combobox
				value={selectedCountries}
				onChange={setSelectedCountries}
				onClose={() => setQuery('')}>
				<div className='relative mt-1'>
					<div className='relative w-full text-left bg-bgGreen rounded-lg border border-[#C2C8D0] p-4 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden'>
						<div className='flex items-center'>
							{selectedCountries && (
								<div className='h-4 w-6 overflow-hidden'>
									<img
										src={selectedCountries.flags.png}
										alt={`${selectedCountries.name} flag`}
										className='h-full w-full object-cover'
									/>
								</div>
							)}
							<ComboboxInput
								className=' border-none focus:ring-0 py-2 pl-3 pr-10 leading-5 bg-transparent outline-none text-[#858585] text-lg w-[70%]'
								displayValue={(country: Country) => country.name}
								onChange={(event) => setQuery(event.target.value)}
							/>
						</div>
						<ComboboxButton className='absolute inset-y-0 right-0 flex items-center pr-2'>
							<LuChevronsUpDown
								className='w-5 h-5 text-gray-400'
								aria-hidden='true'
							/>
						</ComboboxButton>
					</div>
					<ComboboxOptions
						anchor='bottom'
						className='empty:hidden absolute left-0 mt-1 h-60 w-[25rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
						{filteredCountries.map((country: Country, index: number) => (
							<ComboboxOption
								key={index}
								value={country}
								className='data-[focus]:bg-blue-100'>
								{({ focus, selected }) => (
									<div
										className={clsx(
											'group flex items-center gap-2',
											focus && 'bg-blue-100'
										)}>
										{selected && <CheckIcon className='size-5' />}
										<div className='h-4 w-6 overflow-hidden'>
											<img
												className='w-full h-full object-cover'
												src={country?.flags?.png}
												alt=''
											/>
										</div>
										{country.name}
									</div>
								)}
							</ComboboxOption>
						))}
					</ComboboxOptions>
				</div>
			</Combobox>

			<div className='flex items-center gap-2 mt-7'>
				{/* countrycode */}
				<div className=''>
					<div className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'>
						{selectedCountries && (
							<div className='flex items-center gap-2'>
								<div className='h-4 w-6 overflow-hidden'>
									<img
										src={selectedCountries.flags.png}
										alt={`${selectedCountries.name} flag`}
										className='h-full w-full object-cover'
									/>
								</div>

								<div>
									<h1>{selectedCountries.countryCallingCode}</h1>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* phone number */}
				<div className='w-full'>
					<input
						className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
						type='text'
						placeholder='8097979797'
					/>
				</div>
			</div>
		</div>
	);
};

export default CountrySelect;
