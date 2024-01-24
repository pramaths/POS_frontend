"use client"
import "./journey.css"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GiRocket } from "react-icons/gi";
import { GiCubes } from "react-icons/gi";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { FaInfo } from "react-icons/fa6";

const Journey = () => {

    const router = useRouter();
    const navigateToHomePage = () => {
        router.push("/")
    }

    return (
        <div className="containerTop">
            <div className="header">
                <span className="headerIcon" title="Back to Home" onClick={navigateToHomePage}><IoArrowBackCircleOutline /></span>
                <h1 className="heading">
                    Journey of Blockzy
                </h1>
                <div className="subtitleDiv">
                <h2 className="subtitle"> Blockzy: Your Gateway to Immersive Ethereum Proof-of-Stake Simulation</h2>
                </div>
                
            </div>
            
            <span className="rocket"><GiRocket /></span>
            <span className="cubes"><GiCubes /></span>

            <div className="main">
                <h3 className="head"> Our Story </h3>
                <div className="container">
                    <ul>
                        <li>
                            <h3 className="heading">How it Started ?</h3>
                            <p> The journey of Blockzy started as a part of BlockChain Hackathon conducted by PESU - ISFCR. </p>
                            {/* <a href="#">Read More </a> */}
                            <span className="date">September 2023</span>
                            <span className="circle"></span>
                        </li>
                        <li>
                            <h3 className="heading"> Purpose </h3>
                            <p> Ease the process of learning Blockchain through realtime simulation of Ethereum(Proof-of-Stake) Blockchain </p>
                            {/* <a href="#">Read More </a> */}
                            <span className="date">Purpose</span>
                            <span className="circle"></span>
                        </li>
                        <li>
                            <h3 className="heading">Development Process</h3>
                            <p> Created a user-friendly interface using modern frontend technologies.  <br/>
                                Implemented account creation using Ethereum JS, addressing challenges in key management .<br/>
                                Developed a transaction module for Ethereum transactions and enabled user staking in our PoS model. This phase involved overcoming challenges related to gas computation, network latency, and designing a secure and equitable staking process. <br/>
                                Established a memory pool and integrated validators, focusing on efficient transaction validation within our PoS system. We resolved challenges around validator selection and consensus mechanisms. </p>
                            {/* <a href="#">Read More </a> */}
                            <span className="date">Development</span>
                            <span className="circle"></span>
                        </li>
                        <li>
                            <h3 className="heading">Vision</h3>
                            <p> Simulate the working of Blockchain through this platform to facilitate the learning of various terminologies and processes involved especially with Ethereum Blockchain </p>
                            {/* <a href="#">Read More </a> */}
                            <span className="date">Vision</span>
                            <span className="circle"></span>
                        </li>
                        <li>
                            <h3 className="heading">Victory</h3>
                            <p> Won 🏆 First place in the hackathon for building "Blockzy: Your Gateway to Immersive Ethereum Proof-of-Stake Simulation"</p>
                            {/* <a href="#">Read More </a> */}
                            <span className="date">November 2023</span>
                            <span className="circle"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="creatorSection">
                <div className="creatorHeaderDiv"> <h1 className="creatorHeader">Creators</h1>  </div>

                <div className="cardSection">
                    <div className="card">
                        <div className="card__border">
                            <div className="card__perfil">
                                <img src="/uday.png" alt="card image" className="card__img" />
                            </div>
                        </div>

                        <h3 className="card__name">Uday</h3>
                        <span className="card__profession">Frontend Developer</span>


                        <div className="info">
                            <div className="info__icon">
                                <FaInfo />
                            </div>

                            <div className="info__border">
                                <div className="info__perfil">
                                    <img src="/uday.png" alt="card image" className="info__img" />
                                </div>
                            </div>

                            <div className="info__data">
                                <h3 className="info__name">Uday Kiran Reddy N</h3>
                                <span className="info__profession">6th Sem CSE</span>
                                <span className="info__location">PES University, Bangalore</span>
                            </div>

                            <div className="info__social">
                                <a href="https://www.linkedin.com/in/udaykiranreddy-26072003s" target="_blank" className="info__social-link">
                                    <span className="info__social-icon">
                                        <FaLinkedinIn />
                                    </span>
                                </a>

                                {/* <a href="https://dribbble.com/" target="_blank" className="info__social-link">
                                    <span className="info__social-icon">
                                        <i className="ri-dribbble-fill"></i>
                                    </span>
                                </a> */}

                                <a href="https://github.com/UdaykiranReddy-1" target="_blank" className="info__social-link">
                                    <span className="info__social-icon">
                                        <IoLogoGithub />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card__border">
                            <div className="card__perfil">
                                <img src="/pramath1.png" alt="card image" className="card__img" />
                            </div>
                        </div>

                        <h3 className="card__name">Pramath</h3>
                        <span className="card__profession">Backend Developer</span>


                        <div className="info">
                            <div className="info__icon">
                                <FaInfo />
                            </div>

                            <div className="info__border">
                                <div className="info__perfil">
                                    <img src="/pramath1.png" alt="card image" className="info__img" />
                                </div>
                            </div>

                            <div className="info__data">
                                <h3 className="info__name">Pramath S</h3>
                                <span className="info__profession">6th Sem CSE</span>
                                <span className="info__location">PES University, Bangalore</span>
                            </div>

                            <div className="info__social">
                                <a href="https://www.linkedin.com/in/pramath-s-a90307254/" target="_blank" className="info__social-link">
                                    <span className="info__social-icon">
                                        <FaLinkedinIn />
                                    </span>
                                </a>

                                {/* <a href="https://dribbble.com/" target="_blank" className="info__social-link">
                                    <span className="info__social-icon">
                                        <i className="ri-dribbble-fill"></i>
                                    </span>
                                </a> */}

                                <a href="https://github.com/pramaths" target="_blank" className="info__social-link">
                                    <span className="info__social-icon">
                                        <IoLogoGithub />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

            <div className="contactSection">
               <div className="contactHeader">

                     <p>For any queries or information , leave a message at : 
                                <a href="mailto:uday410ry@gmail.com" className="mailLink"> uday410ry@gmail.com </a>| 
                                <a href="mailto:pramaths848@gmail.com" className="mailLink"> pramaths848@gmail.com</a></p>
               </div>
            </div>


        </div>

    );
}

export default Journey;
