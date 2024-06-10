import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export const useConverstion = () => {
	const params = useParams();

	const conversationId = useMemo(
		() => params?.id || ('' as string),
		[params?.id]
	);

	const isActive = useMemo(() => !!conversationId, [conversationId]);

	return {
		isActive,
		conversationId,
	};
};
