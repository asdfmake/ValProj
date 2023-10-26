export default function lekcijaPage({params}: any) {
    
    console.log(params.nesto)
    return(
        <p>{params.nesto[0] + " " + params.nesto[1]}</p>
    )

}