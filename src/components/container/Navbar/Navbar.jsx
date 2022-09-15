import React, { useRef, useEffect, useState } from 'react'
import './Navbar.scss';
import { Link } from "react-scroll";
import { images } from '../../../constants/index'
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Navbar = () => {
	const [show, setShow] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)
	const [toggle, setToggle] = useState(false)

	const displayMenu = (ableScroll, showMenu) => {
		document.body.style.overflow = ableScroll
		setToggle(showMenu)
	}

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	const controlNavbar = () => {
		if (typeof window !== 'undefined') {
			if (window.scrollY > lastScrollY) {
				setShow(false)
			} else {
				setShow(true)
			}

			setLastScrollY(window.scrollY)
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', controlNavbar);

			return () => {
				window.removeEventListener('scroll', controlNavbar);
			};
		}
	}, [lastScrollY]);

	return (
		<nav
			className={`navbar ${show ? 'top' : 'hidden'}`}
		>
			<header>
				<img src={images.logo} alt="logo" className='logo' onClick={scrollToTop} />
				<div>
					<ul className={`nav__links`}>
						{['transfer', 'services', 'transactions'].map((item) => (
							<li key={`link-${item}`}>
								<Link
									className='navbar_link'
									activeClass="active"
									to={item}
									spy={true}
									smooth={true}
									offset={-10}
									duration={500}
								>
									<p
										onClick={item === 'transfer' ? scrollToTop : null}
										className='navbar_link'
									>
										{item}
									</p>
								</Link>
							</li>
						)
						)}
					</ul>
				</div>
			</header>

			<div className="app__navbar-menu">
				<img src={images.logo} alt="logo" className='logo' onClick={scrollToTop} />
				<HiMenuAlt4 onClick={() => {
					setToggle(true)
				}} />

				{toggle && (
					<motion.div
						whileInView={{ x: [300, 0] }}
						transition={{ duration: 0.85, ease: 'easeOut' }}
						className='nav__links-container'
					>
						<HiX onClick={() => {
							setToggle(false)
							document.body.classList.remove("no-scroll")
						}} />
						<ul className={`nav__links`}>
							{['transfer', 'services', 'transactions'].map((item) => (
								<li key={`link-${item}`}>
									<Link
										className='navbar_link'
										activeClass="active"
										to={item}
										spy={true}
										smooth={true}
										offset={-100}
										duration={500}
									>
										<p
											onClick={() => {
												if (item === 'transfer') {
													scrollToTop()
												}
												setToggle(false)
											}}
											className='navbar_link'
										>
											{item}
										</p>
									</Link>
								</li>
							)
							)}
						</ul>
					</motion.div>
				)}
			</div>
		</nav>
	)
}

export default Navbar