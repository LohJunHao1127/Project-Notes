// Name: loh jun hao
// Class: DCITP/1A/05
// ADM: 2222910

var input = require('readline-sync');

var removed_member = []

class Member{
    constructor(name,rank,date_join,date_of_birth,points){
        this.name=name;
        this.rank=rank;
        this.date_join=date_join;
        this.date_of_birth=date_of_birth;
        this.points=points;

    }
    getdetails(){
        // the do while loop that validates the name
        do{
            this.name = input.question("Please enter member's name: ");
            var loop = false;
            for(var i=0;i<members_Group.memberlist.length;i++){
                if(((this.name).toLowerCase()==(members_Group.memberlist[i].name).toLowerCase())){
                    console.log("Member's name exists in database. Please enter a new name");
                    loop = true;
                }
                
            }
            if(this.name==""||this.name==" "||this.name.includes(",")||this.name.includes(".")||this.name.includes("<")||this.name.includes(">")||this.name.includes("/")||this.name.includes("?")||this.name.includes(";")||this.name.includes(":")||this.name.includes("'")||this.name.includes("\"")||this.name.includes("[")||this.name.includes("{")||this.name.includes("]")||this.name.includes("}")||this.name.includes("\\")||this.name.includes("|")||this.name.includes("=")||this.name.includes("+")||this.name.includes("-")||this.name.includes("_")||this.name.includes(")")||this.name.includes("(")||this.name.includes("*")||this.name.includes("&")||this.name.includes("^")||this.name.includes("%")||this.name.includes("$")||this.name.includes("#")||this.name.includes("@")||this.name.includes("!")||this.name.includes("~")||this.name.includes("`")){
                console.log("Please enter a valid name");
                loop = true;
            }
        }while(loop);
        
        this.rank = "Ruby";

        this.date_of_birth= input.question("Please enter member's date of birth: ");
        
        
        // code to display current date
        var joindate = new Date();
        var month ;
        if(joindate.getMonth()==0){
            month = "Jan";
        }
        else if(joindate.getMonth()==1){
            month = "Feb";
        }
        else if(joindate.getMonth()==2){
            month = "Mar";
        }
        else if(joindate.getMonth()==3){
            month = "Apr";
        }
        else if(joindate.getMonth()==4){
            month = "May";
        }
        else if(joindate.getMonth()==5){
            month = "Jun";
        }
        else if(joindate.getMonth()==6){
            month = "Jul";
        }
        else if(joindate.getMonth()==7){
            month = "Aug";
        }
        else if(joindate.getMonth()==8){
            month = "Sep";
        }
        else if(joindate.getMonth()==9){
            month = "Oct";
        }
        else if(joindate.getMonth()==10){
            month = "Nov";
        }
        else if(joindate.getMonth()==11){
            month = "Dec";
        }

        this.date_join = joindate.getDate()+" "+month+" "+joindate.getFullYear();

        this.points=0;
    }
    
}


class MemberGroup {
    constructor() {
        this.memberlist = [];
    }
    newMember(name,rank,date_join,date_of_birth,points) {
        var member = new Member(name,rank,date_join,date_of_birth,points);
        (this.memberlist).push(member);
    }
    // Date.parse() counts the millisecound elapsed since january 1, 1970, 00:00:00 UTC
    findyoungest(){
        var youngestmem=members_Group.memberlist[0].name
        var youngest= Date.parse(members_Group.memberlist[0].date_of_birth)
        for(var i =0;i<members_Group.memberlist.length;i++){
            if(Date.parse(members_Group.memberlist[i].date_of_birth)>youngest){
                youngestmem=members_Group.memberlist[i].name
                youngest=Date.parse(members_Group.memberlist[i].date_of_birth)
            }
        }
        return youngestmem
    }
    findoldest(){
        var oldestmem=members_Group.memberlist[0].name
        var oldest= Date.parse(members_Group.memberlist[0].date_of_birth)
        for(var i =0;i<members_Group.memberlist.length;i++){
            if(Date.parse(members_Group.memberlist[i].date_of_birth)<oldest){
                oldestmem=members_Group.memberlist[i].name
                oldest=Date.parse(members_Group.memberlist[i].date_of_birth)
            }
        }
        return oldestmem
    }
    Removemem(){
    
        var Remove_member = input.question("Please enter member's name:")
        var check = true
        for(var i =0;i<this.memberlist.length;i++){
            if(Remove_member.toLowerCase()==members_Group.memberlist[i].name.toLowerCase()){
                removed_member.push(this.memberlist[i])
                this.memberlist.splice(i,1)
                check = false
            }  
        }
        if(check){
            console.log("Please enter a valid name.")
            
        }
    }
    UndoRemovemem(){
        var UndoRemove_member = input.question("Please enter member's name:")
        var check = true
        for(var i =0;i<removed_member.length;i++){
            if(UndoRemove_member.toLowerCase()==removed_member[i].name.toLowerCase()){
                members_Group.memberlist.push(removed_member[i])
                removed_member.splice(i,1)
                check = false
            }  
        }
        if(check){
            console.log("Please enter a valid name.")
            
        }
    }
    checkname_exist(name){
        var checking=true
        for(var i = 0; i<this.memberlist.length;i++){
            if(this.memberlist[i].name.toLowerCase()==name.toLowerCase()){
                checking = false
            }
        }
        if (checking==true){
            console.log("Please enter a valid member")
        }
        return checking
    }
    displaymembers(){
        
        for(var i=0;i<members_Group.memberlist.length;i++){
            
            
            // for loop to provide the elements in the arrays of the memberList
            for(var s=0;s<5;s++){

                if(s==0){

                    console.log("\n\nName: "+members_Group.memberlist[i].name)
                }

                if(s==1){
                    console.log("Membership Type: "+members_Group.memberlist[i].rank)
                }

                if(s==2){
                    console.log("Date joined: "+ members_Group.memberlist[i].date_join)
                }

                if(s==3){
                    console.log("Date of Birth: "+ members_Group.memberlist[i].date_of_birth)
                }

                if(s==4){
                    console.log("Points Earned: "+ members_Group.memberlist[i].points)
                }

            }

        }

    }
    displaymember(){
        var valid = true
        var member_name = input.question("Please enter member's name: ")
        member_name=member_name.toLowerCase()
        for(var i=0;i<members_Group.memberlist.length;i++){
            if(member_name==(members_Group.memberlist[i].name).toLowerCase()){
                for(var s=0;s<5;s++){

                    if(s==0){
    
                        console.log("\n\nName: "+members_Group.memberlist[i].name)
                    }
    
                    else if(s==1){
                        console.log("Membership Type: "+members_Group.memberlist[i].rank)
                    }
    
                    else if(s==2){
                        console.log("Date joined: "+ members_Group.memberlist[i].date_join)
                    }
    
                    else if(s==3){
                        console.log("Date of Birth: "+ members_Group.memberlist[i].date_of_birth)
                    }
    
                    else if(s==4){
                        console.log("Points Earned: "+ members_Group.memberlist[i].points)
                    }
                }
                valid = false
            }
            
            

        }
        if (valid){
            console.log("Member does not exist.")
        }
         
    }
    points_update(){
        
        var member_name = input.question("Please enter member's name: ")
        

        member_name=member_name.toLowerCase()
        
        for(var i=0;i<members_Group.memberlist.length;i++){
            if(member_name==(members_Group.memberlist[i].name).toLowerCase()){
                var Spent = input.questionFloat("Please enter amount spent: ")
                var points_earned 
                if (Spent<=50){
                    points_earned=10
                }
                else if (Spent>50&&Spent<=100){
                    points_earned=50
                }
                else if (Spent>100&&Spent<=200){
                    points_earned=100
                }
                else if (Spent>200&&Spent<=500){
                    points_earned=200
                }
                else if (Spent>500&&Spent<=1000){
                    points_earned=500
                }
                else if (Spent>1000&&Spent<=2500){
                    points_earned=1000
                }
                else if (Spent>2500){
                    points_earned=2000
                }
                else{
                    console.log("Please enter a valid input.")
                }
                members_Group.memberlist[i].points+=points_earned
                if(members_Group.memberlist[i].points>=500){
                    members_Group.memberlist[i].rank="Gold"
                }
                else if(members_Group.memberlist[i].points>=5000){
                    members_Group.memberlist[i].rank="Platinum"
                }
                else if(members_Group.memberlist[i].points>=20000){
                    members_Group.memberlist[i].rank="Diamond"
                }
            }


        }

    }
    minimum_purchase(nextrank){
        var money_points = [2000,1000,500,200,100,50,10]
        var minimum_purchase = 0
        var points_2000=0,points_1000=0,points_500=0,points_200=0,points_100=0,points_50=0,points_10=0
        for(var i = 0; i <money_points.length;i++){
        
            minimum_purchase += Math.floor(nextrank / money_points[i] )
            if(i==0){
                points_2000=Math.floor(nextrank / money_points[i] )
            }
            else if(i==1){
                points_1000+=Math.floor(nextrank / money_points[i] )
            }
            else if(i==2){
                points_500+=Math.floor(nextrank / money_points[i] )
            }
            else if(i==3){
                points_200+=Math.floor(nextrank / money_points[i] )
            }
            else if(i==4){
                points_100+=Math.floor(nextrank / money_points[i] )
            }
            else if(i==5){
                points_50+=Math.floor(nextrank / money_points[i] )
            }
            else if(i==6){
                points_10+=Math.floor(nextrank / money_points[i] )
            }
            nextrank=nextrank%money_points[i]
            
        }
        console.log("\t\tYou would need to purchase from us " + minimum_purchase+" times.")
        console.log("\t\tYou will need to spend $2500\.01 and above " + points_2000 +" times\n\t\t$1000\.01 to $2500 " + points_1000 +" times\n\t\t$500\.01 to $1000 " + points_500 +" times\n\t\t$200\.01 to $500 " + points_200  +" times\n\t\t$100\.01 to $200 " + points_100 +" times\n\t\t$50\.01 to $100 " + points_50 +" times\n\t\tless than or equal to $50 " + points_10 + " times\n")
    }

}

var members_Group = new MemberGroup();
members_Group.newMember("Leonardo","Gold","1 Dec 2019","1 Jan 1980",1400);
members_Group.newMember("Catherine","Ruby","14 Jan 2020","28 Oct 1985",250);
members_Group.newMember("Luther","Gold","29 Apr 2020","16 Mar 1992",3350);
members_Group.newMember("Bruce","Diamond","3 Jun 2020","18 Mar 1994",40200);
members_Group.newMember("Amy","Ruby","5 Jun 2020","31 May 2000",500)



console.log("Welcome to XYZ Menbership Loyalty Programme!")

// repeats if there are any special char in name
do{
    var UserName = input.question("Please enter your name: ")
    if(UserName==""||UserName==" "||UserName.includes(",")||UserName.includes(".")||UserName.includes("<")||UserName.includes(">")||UserName.includes("/")||UserName.includes("?")||UserName.includes(";")||UserName.includes(":")||UserName.includes("'")||UserName.includes("\"")||UserName.includes("[")||UserName.includes("{")||UserName.includes("]")||UserName.includes("}")||UserName.includes("\\")||UserName.includes("|")||UserName.includes("=")||UserName.includes("+")||UserName.includes("-")||UserName.includes("_")||UserName.includes(")")||UserName.includes("(")||UserName.includes("*")||UserName.includes("&")||UserName.includes("^")||UserName.includes("%")||UserName.includes("$")||UserName.includes("#")||UserName.includes("@")||UserName.includes("!")||UserName.includes("~")||UserName.includes("`")){
        console.log("Please enter a valid input.")
    }

}while(UserName==""||UserName==" "||UserName.includes(",")||UserName.includes(".")||UserName.includes("<")||UserName.includes(">")||UserName.includes("/")||UserName.includes("?")||UserName.includes(";")||UserName.includes(":")||UserName.includes("'")||UserName.includes("\"")||UserName.includes("[")||UserName.includes("{")||UserName.includes("]")||UserName.includes("}")||UserName.includes("\\")||UserName.includes("|")||UserName.includes("=")||UserName.includes("+")||UserName.includes("-")||UserName.includes("_")||UserName.includes(")")||UserName.includes("(")||UserName.includes("*")||UserName.includes("&")||UserName.includes("^")||UserName.includes("%")||UserName.includes("$")||UserName.includes("#")||UserName.includes("@")||UserName.includes("!")||UserName.includes("~")||UserName.includes("`"))


do{
    var choice = input.question("\nHi "+UserName+", please select your choice:\n\t1. Display all members\' information\n\t2. Display member information\n\t3. Add new member\n\t4. Update points earned\n\t5. Statistics\n\t6. Remove member\n\t7. Undo remove member\n\t8. Exit\n\t>>")
    choice = parseInt(choice)

    // when the user enters the number 1
    if(choice==1){
        members_Group.displaymembers()
    }
    //when the user enters the number 2
    else if(choice==2){
        members_Group.displaymember()
    }
    //when the user enters the number 3
    else if(choice==3){
        var mem = new Member()
        mem.getdetails()
        members_Group.memberlist.push(mem)
    }
    //when the user enters the number 4
    else if(choice==4){
        members_Group.points_update()
    }
    // when user displays 5
    else if(choice==5){
        do{
            
            var subchoice = input.questionInt("\t\tPlease select an option from the sub-menu:\n\t\t1. Display names of (all) a certain type of members only.\n\t\t2. Display the name of the youngest and oldest member in the system.\n\t\t3. Display the name of members with the highest and lowest points earned.\n\t\t4. Display total number of members in each membership type.\n\t\t5. Display the total points in each membership type.\n\t\t6. Display the minimum no. of purchase and the minimum no of times needed to spend a \n\t\t   certain amount of money to get to the next rank for all members \n\t\t7. Display the minimum no. of purchase and the minimum no of times needed to spend a \n\t\t   certain amount of money to get to the next rank for one member \n\t\t8. Return to main-menu\n\t\t>> ")

            if (subchoice==1){
                var member_type = input.question("\t\tEnter Membership Type :")
                var members_rank=""
                if(member_type.toLowerCase()=="diamond"){
                    
                    for(i=0;i<members_Group.memberlist.length;i++){
                        if((members_Group.memberlist[i].rank)=="Diamond"){
                            members_rank+=members_Group.memberlist[i].name+" "
                            
                        }
                        
                    }
                    console.log("\t\tMember(s) of membership type diamond: "+members_rank+".")
                }
                else if(member_type.toLowerCase()=="platinum"){
                    
                    for(i=0;i<members_Group.memberlist.length;i++){
                        if(members_Group.memberlist[i].rank=="Platinum"){
                            members_rank+=members_Group.memberlist[i].name +" "
                        }
                        
                    }
                    console.log("\t\tMember(s) of membership type platinum: "+members_rank+".")
                }
                else if(member_type.toLowerCase()=="gold"){
                    
                    for(i=0;i<members_Group.memberlist.length;i++){
                        if(members_Group.memberlist[i].rank=="Gold"){
                            members_rank+=members_Group.memberlist[i].name+" "
                        }
                    }
                    console.log("\t\tMember(s) of membership type gold: "+members_rank +".")
                }
                else if(member_type.toLowerCase()=="ruby"){
                    
                    for(i=0;i<members_Group.memberlist.length;i++){
                        if(members_Group.memberlist[i].rank.toLowerCase()=="ruby"){
                            members_rank+=members_Group.memberlist[i].name + " "
                        }
                        
                    }
                    console.log("\t\tMember(s) of membership type ruby: "+members_rank+".")
                }
                else{
                    console.log("\t\tPlease enter a valid input.")
                }
            }
            else if (subchoice==2){
                
                console.log("\t\tYoungest member: "+members_Group.findyoungest())
                console.log("\t\tOldest member: "+members_Group.findoldest())
            }
            else if (subchoice==3){
                // member with the most points and least points
                for(i=1;i<3;i++){
                    if(i==1){
                        var highestpoints =members_Group.memberlist[0].points
                        var highestname
                        for(s=0;s<members_Group.memberlist.length;s++){
                            if(members_Group.memberlist[s].points>highestpoints){
                                highestpoints=members_Group.memberlist[s].points
                                highestname=members_Group.memberlist[s].name
                            }
                        }
                        console.log("\t\tHighest: "+highestname)
                    }
                    else if(i==2){
                        var lowestpoints =members_Group.memberlist[0].points
                        var lowestname 
                        for(s=0;s<members_Group.memberlist.length;s++){
                            if(members_Group.memberlist[s].points<lowestpoints){
                                lowestpoints=members_Group.memberlist[s].points
                                lowestname=members_Group.memberlist[s].name
                            }
                        }
                        console.log("\t\tLowest: "+lowestname)
                    }
                }
            }
            else if (subchoice==4){
                // total no of memeber in each membership type
                var rubymem=0,goldmem=0,platinummem=0,diamondmem=0
                for(i=0;i<members_Group.memberlist.length;i++){
                    if(members_Group.memberlist[i].rank.toLowerCase()=="ruby"){
                        rubymem+=1
                    }
                    if(members_Group.memberlist[i].rank.toLowerCase()=="gold"){
                        goldmem+=1
                    }
                    if(members_Group.memberlist[i].rank.toLowerCase()=="platinum"){
                        platinummem+=1
                    }
                    if(members_Group.memberlist[i].rank.toLowerCase()=="diamond"){
                        diamondmem+=1
                    }
                }
                console.log("\t\truby: "+rubymem +"\n\t\tgold: "+goldmem + "\n\t\tplatinum: "+platinummem +"\n\t\tdiamond: "+diamondmem)
            }
            else if (subchoice==5){
                var ruby_pointmem=0,gold_pointmem=0,platinum_pointmem=0,diamond_pointmem=0
                for(i=0;i<members_Group.memberlist.length;i++){
                    if(members_Group.memberlist[i].rank.toLowerCase()=="ruby"){
                        ruby_pointmem+=members_Group.memberlist[i].points
                    }
                    if(members_Group.memberlist[i].rank.toLowerCase()=="gold"){
                        gold_pointmem+=members_Group.memberlist[i].points
                    }
                    if(members_Group.memberlist[i].rank.toLowerCase()=="platinum"){
                        platinum_pointmem+=members_Group.memberlist[i].points
                    }
                    if(members_Group.memberlist[i].rank.toLowerCase()=="diamond"){
                        diamond_pointmem+=members_Group.memberlist[i].points
                    }
                }
                console.log("\t\tRuby: "+ruby_pointmem+"\n\t\tGold: "+gold_pointmem+"\n\t\tPlatinum: "+platinum_pointmem+"\n\t\tDiamond: "+diamond_pointmem)
            }
            else if (subchoice==6){
                // diamond min 20000 Platinum min 5000 Gold min 500 
                
                for(var i = 0; i< members_Group.memberlist.length;i++){
                    console.log("\n\t\t"+members_Group.memberlist[i].name)
                    if(members_Group.memberlist[i].points<500){
                        var nextrank =500-members_Group.memberlist[i].points
                        members_Group.minimum_purchase(nextrank)
                        
                    }
                    else if(members_Group.memberlist[i].points>=500&&members_Group.memberlist[i].points<5000){
                        var nextrank =5000-members_Group.memberlist[i].points
                        members_Group.minimum_purchase(nextrank)
                    }
                    else if(members_Group.memberlist[i].points>=5000&&members_Group.memberlist[i].points<20000){
                        var nextrank =20000-members_Group.memberlist[i].points
                        members_Group.minimum_purchase(nextrank)
                    }
                    else if(members_Group.memberlist[i].points>=20000){
                        console.log("\t\tMember has reached the highest membership rank.\n")
                    }
                }
            }
            else if(subchoice==7){
                var valid = true
                var member_name = input.question("Please enter member's name: ")
                member_name=member_name.toLowerCase()
                for(var i=0;i<members_Group.memberlist.length;i++){
                    if(member_name==(members_Group.memberlist[i].name).toLowerCase()){
                        if(members_Group.memberlist[i].points<500){
                            var nextrank =500-members_Group.memberlist[i].points
                            members_Group.minimum_purchase(nextrank)
                        }
                        else if(members_Group.memberlist[i].points>=500&&members_Group.memberlist[i].points<5000){
                            var nextrank =5000-members_Group.memberlist[i].points
                            members_Group.minimum_purchase(nextrank)
                        }
                        else if(members_Group.memberlist[i].points>=5000&&members_Group.memberlist[i].points<20000){
                            var nextrank =20000-members_Group.memberlist[i].points
                            members_Group.minimum_purchase(nextrank)
                        }
                        else if(members_Group.memberlist[i].points>=20000){
                            console.log("\t\tMember has reached the highest membership rank.\n")
                        }
                        valid = false
                    }
                }
                if (valid){
                console.log("Member does not exist.")
                }
            } 
            else if(subchoice==8){ // elemines subchoice == 8 from being a else 
                
            } 
            else{
                console.log("Please enter a valid input.")
            }
        }while(subchoice!=8)
    }
    else if(choice==6){
        members_Group.Removemem()
        
    }
    else if(choice==7){ // 
        members_Group.UndoRemovemem()
    }
    // when user displays 8
    // displays the ending message
    else if (choice==8){
        console.log("Thank you & goodbye!")        
    }
    //error message
    else{
        console.log("Please enter a valid input.")
    }

}
while(choice!=8)// when the choice is not equal to 7 it will repeat, but when 6 is inputed the progrem will end


// function could be considered as a good way to validate the names of the the members 
// name canoot be repeated or have spcial chars





