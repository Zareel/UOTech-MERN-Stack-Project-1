import React from 'react'

const Footer = () => {
  return (
    <footer className="px-4 py-8 dark:bg-stone-950 text-cyan-200 text-xl">
	<div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
		<div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
			
            <h1 className='text-cyan-500 text-5xl font-bold'>Logo</h1>
			
			<ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
				<li>
                Terms of Use
				</li>
				<li>
                Privacy
				</li>
			</ul>
		</div>
		<ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
			<li>
            Instagram
			</li>
			<li>
				Facebook
			</li>
			<li>
				Twitter
			</li>
		</ul>
	</div>
</footer>
  )
}

export default Footer