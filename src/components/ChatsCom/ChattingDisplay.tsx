const ChattingDisplay = () => {
	return (
		<div className='hidden md:flex flex-col items-center justify-center md:w-full font-inter'>
			<div>
				{/* gif */}
				<div className=''>
					<img src='./chat.gif' alt='' />
				</div>

				{/* text */}
				<div className='text-center mt-[4rem]'>
					{/* paragraph */}
					<p className=''>No messages yet ...</p>

					{/* paragraph 2 */}
					<p className=' text-lg lg:text-xl font-bold'>
						Select a user to send message.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChattingDisplay;
