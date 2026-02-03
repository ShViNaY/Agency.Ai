import React from 'react'
import Title from './Title'
import assets from '../assets/assets'
import {toast} from 'react-hot-toast'
import {motion} from 'motion/react'

const ContactUs = () => {

    const onSubmit = async (event) => {
        event.preventDefault();
        // setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "9a9dd29b-f31f-40d3-981b-33468c1711b3");

        try{
            const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
            });

            const data = await response.json();

            if (data.success) {
            toast.success('Thank You for your submission!')
            event.target.reset();
            } else {
            toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }


  return (

    <motion.div
        initial = "hidden"
        whileInView = "visible"
        transition = {{staggerChildren : 0.2}}
        viewport = {{once: true}}

      id="contact-us"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Title
        title="Reach out to us"
        desc="From strategy to execution, we craft digital solutions that move your business forward."
      />

      <motion.form 
      initial = {{opacity: 0, y: 30}}
      whileInView = {{opacity: 1, y: 0}}
      transition = {{duration: 0.5, delay: 0.4}}
      viewport = {{once: true}}

      onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full">

        
        <div>
          <p className="mb-2 text-sm font-medium">Your Name</p>

          <div className="flex items-center pl-3 rounded-lg border border-gray-300 dark:border-gray-600">
            <img src={assets.person_icon} alt="name icon" />

            <input name = "name"
              type="text"
              placeholder="Enter Your Name"
              className="w-full p-3 text-sm outline-none bg-transparent"
              required
            />
          </div>
        </div>

       
        <div>
          <p className="mb-2 text-sm font-medium">Email ID</p>

          <div className="flex items-center pl-3 rounded-lg border border-gray-300 dark:border-gray-600">
            <img src={assets.icon} alt="" />

            <input name = "email"
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-3 text-sm outline-none bg-transparent"
              required
            />
          </div>
        </div>
        <div className='sm:col-span-2'>
            <p className='mb-2 text-sm font-medium'>Message</p>
            <textarea name = "message"
                rows={8}
                placeholder='Enter your message'
                className='w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:border-gray-600' required
            />
        </div>

        <button type="submit" className='w-max flex gap-2 bg-primary text-white text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-103 transition-all'>Submit <img src={assets.arrow_icon} className='w-5'alt="" /></button>


      </motion.form>
    </motion.div>
  )
}

export default ContactUs
