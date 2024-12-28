'use client'

import { Skeleton } from '@mui/material'

export default function LoadingCon() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className='grid grid-cols-3 gap-8 w-full'>
			<Skeleton variant='rectangular' width='100%' height='100%' />
			<Skeleton variant='rectangular' width='100%' height='100%' />
			<Skeleton variant='rectangular' width='100%' height='100%' />
			<Skeleton variant='rectangular' width='100%' height='100%' />
			<Skeleton variant='rectangular' width='100%' height='100%' />
			<Skeleton variant='rectangular' width='100%' height='100%' />
			<Skeleton variant='rectangular' width='100%' height='100%' />
			<Skeleton variant='rectangular' width='100%' height='100%' />
			<Skeleton variant='rectangular' width='100%' height='100%' />
		</div>
	)
}
