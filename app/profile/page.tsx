"use client"
export default function profilePage() {
    
    let content = {
        "div": "pusi kurac",
        h1: "naaslov"
    }

    function getData(){
        console.log(content)
        console.log(Object.entries(content))
    }

    function Scroll(id: string){
        document.getElementById(id)?.scrollIntoView({behavior: "smooth"})
    }
    

    return(
        <main className="bg-base-100 pt-8 p-[8px]">
            <nav className="breadcrumbs p-auto flex justify-center align-center top-14 sticky bg-base-100 z-11">{/* nestaje iza hero slike ispod */}
                <div className="text-sm breadcrumbs text-center">
                    <ul className="p-auto">
                        <li onClick={()=>{Scroll("Video")}}><a>Video</a></li> 
                        <li onClick={()=>{Scroll("Opis")}}><a>Opis</a></li> 
                        <li onClick={()=>{Scroll("Opis")}}><a>Test</a></li>
                    </ul>
                </div>
            </nav>

            <section className="h-[30rem] relative bg-cover bg-center bg-fixed z-1"style={{ backgroundImage: `url(https://cdn.catholic.com/wp-content/uploads/AdobeStock_203188131-900x900.jpeg)` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <h1 className="text-4xl font-bold text-white">Welcome to our Website</h1>
                    <p className="text-lg text-white mt-4">Discover amazing products and services.</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 mt-8 rounded-md">
                    Get Started
                    </button>
                </div>
            </section>

            <h1 className="text-center text-2xl">Naslov</h1>
            <section className="video p-[20px]" id="Video">
                <div>
                    <figure className="bg-base-100 m-auto flex justify-center align-center">
                        <iframe width={560} height={315} src="https://www.youtube.com/embed/qv-3wYpHSBY" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                    </figure>
                </div>
            </section>

            <section className="description m-auto md:w-[80%] mt-[40px]" id="Opis">{/* stavi sve elemente u element koji ima klasu md:w-[80%] */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                <h2>neki naslov u tekstu</h2>
                Dicta mollitia repellat aspernatur! Incidunt aperiam deserunt fugiat earum odit quibusdam qui quae, rem vero quia, voluptatum blanditiis esse ab expedita! Dolore sed fuga nostrum, cum adipisci doloribus? Ut delectus, quae maxime nihil rem, error consequuntur, laborum sit harum consequatur voluptas in odit explicabo quia corrupti quidem! Odit pariatur optio vitae amet expedita placeat nesciunt eius illum cupiditate tempora aspernatur corrupti vero rerum tempore mollitia voluptatibus modi, ipsum error nulla! Ipsa ad voluptatibus cum beatae quaerat doloribus ut laborum odit dolor obcaecati iusto suscipit, error nulla pariatur quia temporibus hic sapiente? Quis aliquid ex doloribus dolore est quidem laboriosam quo architecto error consectetur ipsam officiis temporibus similique beatae, omnis laborum assumenda facere.
            </section>

            <section className="test mt-[40px]" id="Test">
                <div className="w-[85%] h-[25vh] m-auto flex justify-center items-center text-2xl border-solid border-4 border-red-500 rounded">
                    <span>ovo je mesto za test ili neki CTA</span>
                </div>
            </section>
        </main>
    )
}