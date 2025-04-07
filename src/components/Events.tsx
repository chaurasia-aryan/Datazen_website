import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import ScrollVelocity from "../ReactBits/Particles/ScrollVelocity";

// HERE YOU CAN ADD THE EVENTS DATA
const eventsData = [
  {
    id: 1,
    title: "Diddy Party",
    description: "A comprehensive workshop on data science fundamentals and practical applications.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP4sjr7wjbzMT8g2nNFLPoo5f785AGUtxDGQ&s",
    date: "June 15, 2023",
    category: "Workshop"
  },
  {
    id: 2,
    title: "HackData",
    description: "24-hour hackathon focused on creating innovative data-driven solutions.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhIVFRUVFRUVFRUVFRUVFRUXFRgXFxUWFhUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGi0lHSUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAECAwQGBwj/xAA8EAABAwIEAwYDBgUEAwEAAAABAAIRAyEEBRIxQVFhBiIycYGRE7HBFEJSodHhBxUjYvAzcpLxJDSCFv/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAkEQACAgICAgIDAQEAAAAAAAAAAQIRAyESMQRBEyIyUWFxFP/aAAwDAQACEQMRAD8A86qPMm6h8Q81KpuVBdRzUS1Hmn1nmogJAIoCRceabWeaRCQagBBx5qFfFBglxSxFUMbqP/a57EVy90n06BROVFRjZfise9/Egcv1WUVDzKZNCwbs3Sokah5lOKh5lQSQBMVTzKsp4hzTIcQVW0fslpt1QB1WUdoqYGmvRDzwcCW+4Rk9oA0f0aLGdT3j6LhGsMAmD0KI5fip7pEclUaemRJVtBXGY6pVOqo8uPXh5LP8Q80iFArdJGRNtQ80tZ5qAUgExEmuPNS1HmqgpJCE1x1G/BSJMbqtvi9E6BjBx5pajzUSmQMfWeZUw88z7quE4KBGzUeZTqtJAFb9yoqb9ykmAwUmtSaFKEWA0Jw1ShJxgE8gSkACzmtL9PBvzQ2FZUdJJPG6gQuduzoSpUIpgFJ3JKCbAJDIgfupsYUhTO3FXNoHidvZA6K2tJsI3VzmmRB81bpEW6eiN5PlVtTxG0deqyyZFBWzbFhc3QBqU3OMcOKcnTAC6LOcvGnW0Ln2MuZJ2/yEseTmrDLicHQTwtbWL7hWQhmGfocOtj+qLFdkJWjilGmQTJyktCRJJpTFyKExh4vRSIsqg7veifUSkA8pEpNCeEDGSCSdAi+Uk6SB2RfuU4SfuUmpiHCmQmhPKOgHaFVjrU3TyVwUMayabh0KT6BHKkSmj1UWlWU2yYj1XMdVDCgd/wDAraeGcbfstL6PdgDyKiGOB4qeSK4Mrp0QDd1z7grcaJcQ0CbX6/qtuW5OagFoPM8V1+WZGykGlwDnjjw9FlLKkbwwNsFZdkQaNbhcjwwtr6UIpVdzWWu1cc7ltnfBKKpGCoyQQuXx+DLXbTyXWkLHiaLXbiUY5cWTlhzRyGIBBBPsjWHpF1PXsq83wLQNTbQiVAtNFjZggbcz1XX81JNfs5I+OpOSf6BkJirHclBwXonlogoQpuSCaEyIbdTUWuuU8hIYmppTlRhADhOAmToEaEk8JICyupufNOEzzcppTGTaVIFVtTkoEWtcpzY9RCpaVY0pAce9sE+ZRLAju7LPmtDTUPI3CfLqvArkyrTO3C9higRyW+ndCGkhbsLWXDJHowaC2FqRzRjDYu26BU6oWqlWlRdGqC5rKDrrLRqrdSiOqLHRlrtWJ6KVtLQXOXP1MaXGGxuhRsznJLstrU9QLTxCfJCxlMlzZc18A9DzS1WVVIhrxMkOiQOMbKqtUTGSUlIzYsDW6NpKyPRTO8K+nUh4ALgHgDgChbl6+N3FHi5FU3/pApFOAnKszK6Td/NWRZMwbpyEDIpJ0yAEkE6SBGlJNCSQiFQ3KiSnqblRlMokE6hKcIAsCsaFU1W00CM+aYD4jbbtmFzVIkO6zC7ILnc0wbmO1abTuNllkWzbE/6WsMqym3qsoNgQtOGN1wSjR6cJJhTCgoiyiRdDKNQt42Vr8zA+8N1ztNs6lKKWze2pHG6fEZqGC54Sh7ce13FO/LNZ1E+XJNQ3sTnr6g/E5u+q7fSzmfmtGBpMILqet4BDS7YSlTqUKUio0P3kHYHoqHdow0fDosDGTP7rqUdVFHC5JSuTOmfh9LbkLHiKBtHMQeqBDGl97uM7kzA4W/zZHMLpFJpD9T3E6gR/pibAFQ8LjuxryFN1Q+e5g+vV1PDQWtawBogQ3j5oU9EMaNjzWBwXoYncEedlXGbRWE4anhS0WWhmRotspOCVFvd9U7whAVQmUyEwTAjCcJ0iEhl8pJQkgCh+5TFSfuVBADlOCoqSAJtVjSqmlWMSbpWwSbdIvYVY+mHNLTxEK7C4IHd0FazlbhcXHRcv/Zj9nYvBy9nHVMOWd07jbryWCq0ySD+oXZYnLDVc2mHAE8XCI6SEPzPs9VoEGoGwTGoG3mVkssW9HQ8E1HZz9Ck9xgFx46RJKJZflPxGuc5ugNFtUguPJI1Rh3FzHFxOzmju+hPmsONzerU3Mc44+av7PoxbjHs3UsHpMzA4yZRvG4t32fWwE6PvcP3XGYap3xLnX3i5XfdnqQrUzSeS0EXaLc4LuqyyxUakzfDJzuKOBxVR7nEvJne/XkrMNlz37AgcyF11fs2aLj8RnxPwvuYHCytp4Cbh5ELZZItWmc0sU06aBWBywtETHU7+gRanRDRYHz29gtWHYW8nciWj5qNW5k3KxnlvSNYYGtsz1mSCOIWAsRnC1ND2uidLgYOxHEL0cfwxw9dvxqVV7BUAqNbYtGvvQOMXW/j5ElTMfIg27R4+WpFq7XP/AOHGLw8uaBWYOLPF6tXJHCv/AAO/4n9F0qSZytNFGG2PmlUT02ETIgzxCd7SqEUJNCnpT02EmAJJ4ASUCIFKF2WRdgK9YfEqkUqe97uPkF0uXfw7wpGpzqjh1MfJQ5pFKLZ5joSXsP8A+Iwf4Hf8ikl8iHwZ4lV3KiFKoLlQWhI6SQKdTKSirZUYuTpEmbrZQpnhvz5KigAuu7OZMK9J72ySx0QAT7ry/J8hv/D1vG8eONcpdgLCljD30boU2uHcfHRP2lykUqTHPpaHEkC0Eg7FAKOKfTvNo4iLBYQhLIrR0PPCD30GXM0mKl2njvCzZ9lmJdSp2+LSBNpv0JVWTZ62q4g89jyXWYas6hSqd3XS3AH3Z39E4coyprZpJRkrvR4/mGEfq0taYP3RsFro9mSQC6oBO4AkhdQajHTDSNyQBJKHVc0ptNmuK9L8TxPyZmo5VTpnuyXC5LlpyuuRU1cysdfFPq2PdbyBufMqh1Sq0Czbcea58n3XE7MEeH2PTsRXZoDi4GwtxQluIa92rRAFha5XM08fVLNQItwC3sqViA50MB4G35Ln+Jo6/mT66DNeCNkMqNuVFtQg/wCoXcwNvdOHzKcYNMyyTtFbWzAX0H2epFmHoMO4pMB9gvGuxeUHEYmmwjutOt/kP3he3td3xGw+ll0wjo48jt0bHrlsyoX1WFz5m5XR4qrDSeQlczRd8Qlxv9FskczZixfZnDYpv9Vl4s9tnDr1XNM7B4Wm4irUqVLwA2Gx+67itX0MPPYLnG1pJ6G6q30iWl2ctnPYimL4eo4XjS+CfQgLsuyHYylQZ8R7ZdAMn5rZ2cy/4tT4rh3W+EcCUUz/ABwA0A7b9UW32KgZmeKLz8Nm0/4Vc53fbSZwtHluVjwbtLS87nZFsjwmkGq7xPmJ3AU9so2fYCkrfjN/GUlfEOSPl2oblQKepuVGVuZCTNdcjjwUmqqpZwcsPIVwOjxpVkN9LBuMXvyR/s3mNbCVviCXUzapTBjUBxA5hZsobrI5ldS/BU2M1OcGxuCQQf3XjynTo9xYk4jdqMzp4l1N7dJYGTabSTZ08QhlTA06zNPMRbfzQEtNYk4dxaLjSRuN5Clg6WJomSQ4etlbXtPYQVRUa0UHITQfIMjh+JdNlHaAU2up1RPDmIVeGrfHYQY1AGPNc/UYQSHC4Oy3wY1lvl2jm8nNLAlwWmXOrAVC5ggapA6TshWZhoqmLB9x0nce8ojRplxAAmVs7RZU37P3R3mEEniZ3C7MkoxpHl4uTbZzjCWyqahLzGw5lU0sSRYrZSc1x4A9dvdZcV2dHyNqjXgMSBDGN1ehI910OHwDqph9p4ngPogmFraDMj9FsqZz11Hp9Ss5Rd6R2YsmJR+zCGMYxhLWbARPNY6QkwNyYHWVgrY4bn2C6f8AhplzsRim1XNPw6cungTwCqONs58uVbo9P7F5AMLRkiaj4LjyHBq6HCtuSoOvYLRMCButVt/xHK3r+sx55UinHMwgeVPjV5lbM+rXDOQkoXlLpc4dfoFoZPsszKpfyBKBU2OJAG9R35IvnAjV5J+zuF11Gk/dCSEzpWRRpBo3j3XLY6sXvjqjGbVtTnRs2w8+KA0bvCcgRuoYY1KjKXDc+QRjHVi9/wAOmNoEoFgKzvj2NiIXTV6rKFIvsD90cSSpiUzJ/Jqn4klj/nFfkkrpk8kfO7xcqJCnU3KitiB4VeIbsrwFXXbt5rLN+DNcP5oP9n2SW9F1Oc5e2pQeC0SRvC5rs8Nl3FNocwheFN1Kz6SCuJx+DoupgECOAt7rocI1lQXHej3UKFId5pFifZacNgw2XCfJF2WlSOcxDhQrBwFiYICMOyZuJf8AF0ltoINpWPGM1P1BsxxjZdBkbqpEPFhsTZduBdP2eT5eZ7h6KsN2dAiSAP7Vo/llOXU3DU1wi6JncLNXHfBWslTONM8az/KPhVn0ttJt1B2WBlFzeoXsvaHsxSrvZUqNILhp1NMG3MKOC/hnh3G76kcpC1poanF6Z5EMUIgzPVM1tR1mgno0GSvf8N/DfANF6Jeeb3OKK4PsjQp3YxrR0H1TRLa9Hz9Q7N4p2n+k7vEAF1iPMeq987LZQzDYdjGiHae91PFRqYNusH+6PZEa1fT8oRKVR0KO3s1OqhsAXcduisYdPUndYcE2STNyd/oFuqVWsBPidHoiEaQpO2AMydNQrPkbZqP8/oEq9UkkniVf2bbeq7kT+QCsj2QzWlqLo8vZE+y+G009R3KEOcXOgbuPzXTOinR8mwhAwA4yHHm4oVMOnoilPwoTi7E+SJEo35WwAhxuSZHkoYvEuq1dZPdbMDgD0HqmdW0MsL6VnqnRTHMwl0P3Rt1DmfdMhUn8RSS5DpnjVTcpgE79ykF0mZJqhiNvUKwKzE4YhgJBGraRusc0ko7NcEXKaoKZJV2XYZdXJMcIXBZW4g8l2GTOl3ovFyLZ9HidoJil3un1VeKxEA9FPEV9O+6wUWGq4n7s36nklCDkx5ckYRthrsrR1gtNiTPmjWIw5pu0lSyfJC3S4G2/krM3qA1HEcAAvXhHhE+dyT5zswvv6KrEnYq+tRLY6iVRWuFnLouL2GTSD6E7lrgR0lastf4bb29ViybExTfN7bInQIhkGPvE8gto7iZS1I306p0zsQYPkp1cSGuMn7qGDGa5a0+Im/QKQoS76lIdmSkXWO0ElafgS0OduT+So1gvLRsDHmiVVtgORCaQiWEYAOgWfMMTAIHkr6lUNBQavWBt6lNgZnFXZI6KNZ3Nx+izVHQsmWVnaXsB++UmxUFcoDfianbN+atzTHGoYFmjYfqqKNHS3qblVHdOIpGlmyD5j4kYGyC4/wASGSjRjdqfUwfJYswqy+Pw2V2bVtDKTv7wPdDA+XDqSUmUaUlb8NJKh8jx2oLlMApPFyiOR5ca1VrIJbI1EcAuhuiEdB/DvIG1q3xKzf6YHdnYu8uS6ntJ2ZaHaKgJY4lzKjTAbxjlFkVy7L9DRpbAFgj2ExALTTqAOaeBC8/Ni+bd1+jrxZPi6PHcT2Yqsgth4MkQbx5KWX13UyQ5rp5L0/HdlTIqYWrpc0HTTqd5g6A7j3XP4jBYymZqYH4rtUuc1zXB3LfZcUsGVf09HH5cDka9Y1HATGoxH1JXX5Vl12UxwifqU+X4OvVqAfYjRBMvLtMf/MLunYFlMh0QdMdbLo8WElL7Kjm8zMprRGzG/kFy9bfzdf3XRYh3Hl+X7rnh4h7rumefDs3ZlS7jT6IQDNii+Nrg0yQdr+wXHZfmJfU8Ugza/djayhqy06OrwAI7mknXJngA0cfMz7Leylpa0i8yCPNZsFXDaZdzaAPUlEaHhY0xz+S0S0Q+wdhGEOaYtqcPcFb8zxhp0wWMLiTBvEBYK7izVJiHAjrdb8U6WOb6j8lKGC8ipOdUL6kSLgDh+qLY3FQDG8oTltfTqUnOJkoT0MWIrOO5VFJWEcEqbUAVFslZsvHfeRtqRLZYMp8dUf3/ADAQJBSobLIN1rqC0LM0XVIhmhuyB4w99HY7qAVT3vVDBEe0w/8AEJG7Yd7SgmHx7Q9h4ED89l02YU9WHIPEELzPLKsk0uUtCO0P2el62pLz/wC24rmkimI53D0NdQM/E4D0XtHZbLWU2juhosNhfzPFcZ2VyRraYxDxLnu7s8AOXVen08EH4Uafwz6ol9nRS0gnTeNi0QFGtlrXXYufy/MC06HGeU8CjuXY2bJU0UmmVFj2Wgq+jinbInPNZcSxu43QFFL8U4LO15eZ4KOPp6aZeTsLKrJmn4cnjdVFEyeqHzAjSQgmGbLkTxtTcLPh6cKZbY49EK2DkmNiDI81zmGyYU3kyI6CD0krsHmAhLWyZ5mPRD0MtouLY2hpbINwbcukhGHaYYZvxjbyQZ1cFrmxzIPOTt7KGDqmYLgNIGkc0uhd9G3MSHsc3TcHxeaymqYvyurHE9+Xfv5LJqsQDN4+SAI0HfmVoGyyPsWrYxSUJpU2qpiuCpCK8Q+BKx5YIqOn7wBWt41GFVXhtZoH4P1QnYVRsrlUtVlYSVBtirRmy6p4UAd4vVHsUe6gQHe9UmM31h/SK8ezImlinRzDh67r2R4/pleZdq8qLi6o3xMFxzbO6aWhN7J/zhvRJcn9o/tSRsZ65mzDRoUw3ZmkHyRTsh2kbPwnOF9uhV2MoTIc2QeBC53GdnWnvUiWOFwBtKyjo0Z22dZYHd9tjvI49UIwuZOpOipbrwIVXZjtG5h+z4sR+F52PqV0WOydruEg35j0W0Xa2ZNNdFOZZ3Vpw7RNMgd4X38lrwGJ+JBAlC6OV1adqda34Hi3ldEcOzEAXNMeX7J0ieTZDOcWJbS3k3i+1/otjCAwRwEJxScAS8tNjcAfNU0vB5yUDBuKbdTpJ8YQFlNVSy0X4mv3UMxFQtbbl81c4zZUYlskN6ge1ys2UW4WnAJImwHlCbE03kNcyztJE/iHEK+nABv6c1M20w62/wDtVSIVozYWo3SWm5IMHiI3t0TVGX2gGD+6m/DBrjUaQb3adnWjfh+yCZZjwaxpvc74zg4lp8LQ3bSstrRrp7COJ3C1UzxWPFFaqbrDyVCJA3IVzzZZ6pgg8wrGulMDThqcNLzw280GxD/6rTzn6I5i7MA9UExrPC7k75/9JpaJk9hbgCqWmXKWHdLVGj4lSYpEsXsQhDB3kSzExdYKYkykwCOnuFctiqcVfMELqx4CuezClcOjiFcdETM/8pofgCS2R0TqzO2dmWg2IlY8Tlw3bY8k9LEKx1ZZUdGgDmeBBHfbP+cF02S4lwota+5FpPIbLFWe10TwMpjWhOMSXL9Bh2MHEBYq+atGwBKHN11DDbDmi2CywN7x35lXSRNtg7GVKrhqqHS0cFb9tAaAOQQTtXji57aDDdxvHBo3+Sta20JWIur1pVbSnIhRWbNUSY3ioUR3pImx9yrDZpPonoNOlx4EgeyQPom/wgRfnzU2u7wlu24TlrpaCR05BWNLpN7hDBFJqsAdb9pQbE02ioyoGQ7WQXdCIHpdE6mHeZcHkAm4EcOKzYrDuc1h1Ev7zogWI/VZSu0XCqY2KH6KdB1lB12g8xP6psIdwtCTVVFh0T0k4EiE1FOhGrHnbyQ7GD+i7oQfzRHHcPJZnU5puHNUuiW9kctfIVtHxLFlL+B4GFuA7yIjZTmaxYZpC2ZkVTQCljRtAhnQ8UOxtOWlF3HuR6rAac+RVpktWwVKdEPsKSOTDgb6P6q4pJIGQCjX2SSVxIfYRyrYItU8J8kkk5Died4z/wB8f7HfVFWJJKfRJOoopJLNmiJVfD6qWH8Hqkkj2N9E+IUm8UySkEWfdWHC/wCq3/YfmnSWb7RpHplQ8IVeH8RSSVog30lXTSSVsRqxmw8lUzwFOkqXRL7B2W7nzPzRIeIpJKYjfRnzBVYfgnSSfY0Eanh9FnGySSr0P2SSSSUlH//Z",
    date: "August 22, 2023",
    category: "Hackathon"
  },
  {
    id: 3,
    title: "AI Summit",
    description: "Conference featuring leading industry experts discussing the future of AI.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQiuwliOuhk3mdnkaXgM_rUuWxRVkwta074A&s",
    date: "October 10, 2023",
    category: "Conference"
  },
  {
    id: 4,
    title: "Data Networking",
    description: "Networking event connecting data professionals and enthusiasts.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP4sjr7wjbzMT8g2nNFLPoo5f785AGUtxDGQ&s",
    date: "November 5, 2023",
    category: "Networking"
  }
];

const Popup = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50"> //backdrop
      
      <div className="flex w-full h-full">
       
        <div className="absolute top-[500px] left-80 bg-white text-red-600 font-bold font-serif rounded-lg p-6 max-w-md shadow-lg"> {/*this is for popup box*/} 
          <h2 className="text-xl font-bold mb-2">{event.title}</h2>
          <p className="mb-4">{event.description}</p>
          <p className="text-gray-600">{event.date}</p>
          <button 
            onClick={onClose} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ["All", "Workshop", "Hackathon", "Conference", "Networking"];

  
  const velocity = 25; 

  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.7, 1, 1, 0.7]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const cardVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.03, 
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08, transition: { duration: 0.8 } }
  };

  const filteredEvents = activeCategory === "All"
    ? eventsData
    : eventsData.filter(event => event.category === activeCategory);

  return (
    <section 
      id="events" 
      ref={sectionRef}
      className={`relative pt-28 pb-20 md:pt-40 md:pb-32 px-4 bg-black overflow-hidden ${isPopupOpen ? 'bg-blue-500' : 'bg-black'}`}
    >
      {/* Retro Background Grid */}
      <div className="absolute inset-0 bg-[#0A0A0A]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 39px,
            rgba(255, 0, 0, 0.3) 39px,
            rgba(255, 0, 0, 0.3) 40px
          )`
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 39px,
            rgba(255, 0, 0, 0.3) 39px,
            rgba(255, 0, 0, 0.3) 40px
          )`
        }} />
      </div>
       
      {/* Complementary gradient transition from Team section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0">
          <motion.div 
            className="absolute right-0 top-20 w-64 h-64 bg-red-500 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <motion.div 
            className="absolute left-0 bottom-20 w-64 h-64 bg-gray-100 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        </motion.div>
      </div>

      <motion.div 
        style={{ y }}
        className="container mx-auto relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="flex flex-col"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div 
              className="inline-block px-4 py-1 mb-4 bg-red-50 border border-primary/20 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.span 
                className="text-primary font-mono text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                02 · EVENTS & ACTIVITIES
              </motion.span>
            </motion.div>
            <div className="w-full flex justify-center">
              <ScrollVelocity
                texts={[' OUR ', 'EVENTS']} 
                velocity={velocity} 
                className="custom-scroll-text"
              />
            </div>
            
            <motion.p variants={itemVariants} className="text-lg text-slate-300 max-w-2xl mx-auto">
              Join us for exciting workshops, hackathons, and networking events. We organize various events throughout the year to foster learning and collaboration.
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.05), duration: 0.4 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Events Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  initial="rest"
                  whileHover="hover"
                  animate={hoveredEvent === event.id ? "hover" : "rest"}
                  onHoverStart={() => setHoveredEvent(event.id)}
                  onHoverEnd={() => setHoveredEvent(null)}
                  className="bg-black rounded-2xl overflow-hidden shadow-md border-4 border-red-800 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      variants={imageVariants}
                    />
                    <motion.div 
                      className="absolute top-3 right-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full shadow-md"
                      whileHover={{ scale: 1.05 }}
                    >
                      {event.category}
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <motion.div 
                        className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center mr-2"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </motion.div>
                      <div className="text-gray-100 text-sm">{event.date}</div>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2 group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-red-600 hover:text-red-700 font-mono text-sm font-bold mb-4 leading-relaxed tracking-wide transition-colors duration-300">
                      {event.description}
                    </p>
                    <motion.a 
                      href="#" 
                      className="inline-flex items-center text-primary text-sm font-mono font-medium transition-all duration-300"
                      whileHover={{ x: 5 }}
                      initial={{ x: 0 }}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedEvent(event);
                        setIsPopupOpen(true);
                      }}
                    >
                      Learn more
                      <svg className="w-4 h-4 ml-1 transform transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Render Popup */}
          {isPopupOpen && (
            <Popup 
              event={selectedEvent} 
              onClose={() => {
                setIsPopupOpen(false);
                setSelectedEvent(null);
              }} 
            />
          )}

          {/* Timeline */}
          <motion.div variants={itemVariants} className="mt-20">
            <motion.div 
              className="inline-block px-4 py-1 mb-4 bg-red-50 border border-primary/20 rounded-full mx-auto flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.span 
                className="text-primary font-mono text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                OUR TIMELINE
              </motion.span>
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-10 text-center text-black">
              Event <span className="text-primary">Timeline</span>
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary/70 to-primary/30"
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              ></motion.div>
              
              {/* Timeline items */}
              <div className="flex flex-col space-y-12">
                <motion.div 
                  variants={itemVariants} 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-primary shadow-md flex items-center justify-center"
                    whileInView={{
                      scale: [0, 1.5, 1],
                      opacity: [0, 1, 1]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div className="w-2 h-2 bg-primary rounded-full"></motion.div>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:text-right md:pr-12 pl-4 md:pl-0">
                      <motion.div 
                        className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <h4 className="text-lg font-bold mb-2 text-black">Women Techies</h4>
                        <p className="text-gray-600 text-sm">Our annual women-focused technical event with workshops and competitions.</p>
                      </motion.div>
                    </div>
                    <div className="md:pl-12 pl-4"></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-primary shadow-md flex items-center justify-center"
                    whileInView={{
                      scale: [0, 1.5, 1],
                      opacity: [0, 1, 1]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div className="w-2 h-2 bg-primary rounded-full"></motion.div>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:text-right md:pr-12 pl-4 md:pl-0"></div>
                    <div className="md:pl-12 pl-4">
                      <motion.div 
                        className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <h4 className="text-lg font-bold mb-2 text-black">DevJams</h4>
                        <p className="text-gray-600 text-sm">A 48-hour development hackathon for creating innovative solutions.</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true, margin: "-100px" }}  
                  className="relative"
                >
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-primary shadow-md flex items-center justify-center"
                    whileInView={{
                      scale: [0, 1.5, 1],
                      opacity: [0, 1, 1]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div className="w-2 h-2 bg-primary rounded-full"></motion.div>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:text-right md:pr-12 pl-4 md:pl-0">
                      <motion.div 
                        className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <h4 className="text-lg font-bold mb-2 text-black">Hexathon</h4>
                        <p className="text-gray-600 text-sm">Six-hour rapid ideation and prototyping competition.</p>
                      </motion.div>
                    </div>
                    <div className="md:pl-12 pl-4"></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-primary shadow-md flex items-center justify-center"
                    whileInView={{
                      scale: [0, 1.5, 1],
                      opacity: [0, 1, 1]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div className="w-2 h-2 bg-primary rounded-full"></motion.div>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:text-right md:pr-12 pl-4 md:pl-0"></div>
                    <div className="md:pl-12 pl-4">
                      <motion.div 
                        className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <h4 className="text-lg font-bold mb-2 text-black">CTF</h4>
                        <p className="text-gray-600 text-sm">Capture The Flag cybersecurity competition with challenging puzzles.</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* CTA */}
          <motion.div 
            variants={itemVariants}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true, margin: "-100px" }}  
            className="flex flex-col items-center mt-20 bg-red-50/50 border border-primary/10 p-10 rounded-2xl relative overflow-hidden shadow-sm"
          >
            <motion.div 
              className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            
            <motion.div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/70"></motion.div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black text-center relative z-10">
              Ready to join our <span className="text-primary">next event</span>?
            </h3>
            
            <p className="text-gray-700 mb-8 text-center max-w-2xl relative z-10">
              Subscribe to our newsletter to stay updated on upcoming events and exclusive opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg relative z-10">
              <motion.input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-200 text-black focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                whileFocus={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
              />
              <motion.button 
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(255, 0, 0, 0.2)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Events;