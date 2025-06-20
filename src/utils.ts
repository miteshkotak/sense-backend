

//vehicle status = idle, moving, loading 
//Zone type = crusher, zone A/B/C, storage



class vehicles{

    public name: string
    public id: string
    public capcity: number 
    public functionality: string
    public status: string 


    move(source: string, destination: string): void{
        
    }


    load(material: string, weight: number ): void {

    }


    unload(): void {

    }
}

class POIs{
    public name: string
    public id: string
    public type: string 

}


