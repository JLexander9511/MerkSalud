import Image from "next/image"
import Link from "next/link"

function BackButton() {
  return (
    <div className="bg-white p-2 rounded-full fixed bottom-0 right-0 m-4">
        <Link href='/cards'>
            <Image
                src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694552102/f1_zhqzs1.png'
                width={50}
                height={50}
                alt="arrow"
                className="rotate-90"/>
        </Link>
       
    </div>
  )
}

export default BackButton