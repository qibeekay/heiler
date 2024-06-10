import { Chip } from '@material-tailwind/react';
import { RiSearch2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useConverstion } from '../useConversation';

const doctors = [
	{
		name: 'Chinwe Okoye',
		field: 'Physiotherapy',
		image: '/img1.png',
		label: '#639AFF',
	},
	{
		name: 'Ngozi Okafor',
		field: 'Ear, Nose, Throat',
		image: '/img1.png',
		label: '#A584FF',
	},
	{
		name: 'Emeka Nwachukwu',
		field: 'Heart',
		image: '/img1.png',
		label: '#ff7856',
	},
	{
		name: 'Chike Eze',
		field: 'Pediatrics',
		image: '/img1.png',
		label: '#FD4444',
	},
	{
		name: 'Adebayo Ogunleye',
		field: 'Physician',
		image: '/img1.png',
		label: '#00c9e4',
	},
	{
		name: 'Bola Oni',
		field: 'Skin',
		image: '/img1.png',
		label: '#fd44b3',
	},
	{
		name: 'Tunde Akinwale',
		field: 'Dental',
		image: '/img1.png',
		label: '#A584FF',
	},
	{
		name: 'Ifeoma Adeleke',
		field: 'General Medicine',
		image: '/img1.png',
		label: '#fea725',
	},
	{
		name: 'Kehinde Oladipo',
		field: 'O & G',
		image: '/img1.png',
		label: '#fd4444',
	},
	{
		name: 'Nkechi Okonkwo',
		field: 'Neurology',
		image: '/img1.png',
		label: '#FFBD59',
	},
	{
		name: 'Chukwudi Eze',
		field: 'Physiotherapy',
		image: '/img1.png',
		label: '#639AFF',
	},
	{
		name: 'Chizoba Ibrahim',
		field: 'Ear, Nose, Throat',
		image: '/img1.png',
		label: '#A584FF',
	},
	{
		name: 'Yewande Alabi',
		field: 'Heart',
		image: '/img1.png',
		label: '#ff7856',
	},
	{
		name: 'Chinonso Akande',
		field: 'Pediatrics',
		image: '/img1.png',
		label: '#FD4444',
	},
	{
		name: 'Emmanuel Adeyemi',
		field: 'Physician',
		image: '/img1.png',
		label: '#00c9e4',
	},
	{
		name: 'Folake Dada',
		field: 'Skin',
		image: '/img1.png',
		label: '#fd44b3',
	},
	{
		name: 'Chidi Okafor',
		field: 'Dental',
		image: '/img1.png',
		label: '#A584FF',
	},
	{
		name: 'Aminat Yusuf',
		field: 'General Medicine',
		image: '/img1.png',
		label: '#fea725',
	},
	{
		name: 'Taiwo Agboola',
		field: 'O & G',
		image: '/img1.png',
		label: '#fd4444',
	},
	{
		name: 'Yusuf Ahmed',
		field: 'Neurology',
		image: '/img1.png',
		label: '#FFBD59',
	},
];

const UsersList = () => {
	const router = useNavigate();
	const singleMessege = (id: number) => {
		router(`/chats/${id}`);
	};

	const { isActive } = useConverstion();
	// console.log(isActive);

	return (
		<div
			className={`${
				isActive ? 'hidden md:block' : 'block'
			} w-full md:w-[70%] shadow-right-only bg-white p-4 llg:p-10 relative`}>
			{/* search and add users */}
			<div className='w-full relative bg-white'>
				<div className='flex items-center justify-between gap-10'>
					{/* add */}
					<button>
						<img src='/newchat.png' alt='' />
					</button>

					{/* input field */}
					<div className='w-full'>
						<div className=' shadow-lg bg-white flex gap-2 p-4 w-full rounded-md'>
							{/* icons */}
							<button>
								<RiSearch2Line />
							</button>
							{/* input */}
							<input
								type='text'
								className='w-full outline-none bg-transparent h-full'
								placeholder='Search anything...'
							/>
						</div>
					</div>
					{/* edit */}
					<button>Edit</button>
				</div>
			</div>

			{/* users/chat details */}
			<div className=' mt-10 h-[calc(100vh-10rem)] overflow-y-scroll pb-10'>
				<div className='flex flex-col gap-4'>
					{doctors?.map((doctor, index) => (
						<button
							key={index}
							className='flex items-center gap-4 hover:bg-blue-gray-100 md:p-2'
							onClick={() => {
								singleMessege(index);
							}}>
							{/* imgae */}
							<div className='w-[3rem] md:w-[4rem]'>
								<div className=' w-[2.5rem] md:w-[3.5rem] aspect-square rounded-full overflow-hidden'>
									<img
										className='w-full h-full object-cover object-center'
										src={doctor?.image}
										alt={doctor?.name}
									/>
								</div>
							</div>
							{/* details */}
							<div className='w-full'>
								{/* name/field */}
								<div className='flex w-full justify-between'>
									<div
										className='flex gap-2 md:w-[18rem] overflow-hidden whitespace-nowrap
                                            '>
										<p className='text-sm sm:text-base md:text-lg font-semibold'>
											{doctor?.name}
										</p>
										<Chip
											color='blue'
											value={doctor?.field}
											className='rounded-full capitalize font-normal text-xs'
										/>
									</div>
									<p className='text-[10px] sm:text-sm md:text-base text-[#707991]'>
										18:30
									</p>
								</div>
								{/* label/count */}
								<div className='flex w-full justify-between md:mt-1'>
									<p className='text-xs sm:text-sm md:text-base text-[#707991]'>
										{doctor?.label}
									</p>
									<div className='grid items-center justify-center bg-greens w-4 md:w-6 aspect-square rounded-full'>
										<p className='text-white text-[10px] md:text-xs'>2</p>
									</div>
								</div>
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default UsersList;
