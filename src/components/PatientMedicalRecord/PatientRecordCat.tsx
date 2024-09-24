import React from 'react';

interface Records {
	usertoken: string;
	doctor: string;
	note: string;
	timestamp: string;
}

interface Props {
	response: Records[];
}

const PatientRecordCat = ({ response }: Props) => {
	console.log(response.length);
	return (
		<div className='font-inter text-dark w-full pt-8 px-4 sm:px-8 xl:px-[5rem]'>
			<div className='w-full grid grid-cols-2 gap-4'>
				{response?.map((record, index) => (
					<div
						key={index}
						className='border shadow rounded-md py-6 px-8 bg-white w-full'>
						<div>{record?.note}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PatientRecordCat;
