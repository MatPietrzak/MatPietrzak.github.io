var user1 = {
	tekst:'Gracz 1',
	user:'',
	sign:"O",
	win:0,
	rem:10,
};
var user2 = {
	tekst:'Gracz 2',
	user:'',
	sign:"X",
	win:0,
	rem:10,
};
var label = [0,0,0,0,0,0,0,0,0,0];
var GameCount=0;
var CurrentPlayer;
var blokada=true;
var rand=2;

function Game()
{
	document.getElementById("rozgrywka").innerHTML="Rozgrywka: "+(GameCount+1);
	var selector = document.getElementById("ktogra1");
	user1.user=selector[selector.selectedIndex].value;
	selector = document.getElementById("ktogra2");
	user2.user=selector[selector.selectedIndex].value;
	if(GameCount%2==0)
	{
		CurrentPlayer=user1;
		
	}
	else
	{
		CurrentPlayer=user2;
	}
	document.getElementById("ktogra1").disabled=true;
	document.getElementById("ktogra2").disabled=true;
	document.getElementById("start").disabled=true;
	document.getElementById("again").disabled=true;
	document.getElementById("ruch").innerHTML="Ruch: Gracz "+CurrentPlayer.sign;
	document.getElementById("stan").innerHTML="Stan: ";
	if(CurrentPlayer.user=="Komputer")
	{
		AImove();
	}
	else{
	blokada=false;
	}
	
}
function wybierzpole(id)
{
	var x;
	if(CurrentPlayer.user=="Człowiek" && label[id]==0 && blokada==false)
	{
		label[0]+=1;
		document.getElementById(id).innerHTML=CurrentPlayer.sign;
		document.getElementById(id).style.color="white";
		if(CurrentPlayer==user1)
		{
			label[id]=1;
			x=wincheck(1);
			CurrentPlayer=user2;
		}
		else
		{
			label[id]=2;
			
			x=wincheck(2);
			CurrentPlayer=user1;
		}
	document.getElementById("ruch").innerHTML="Ruch: Gracz "+CurrentPlayer.sign;
	if(CurrentPlayer.user=="Komputer" && x==false)
	{
		blokada=true;
		AImove();
	}

	}
}
function wincheck(num)
{	

	if(label[0]>=5){
		
		if(label[1]==num && label[2]==num && label[3]==num) {change(1,2,3,num);return true;}
		if(label[4]==num && label[5]==num && label[6]==num) {change(4,5,6,num);return true;}
		if(label[7]==num && label[8]==num && label[9]==num) {change(7,8,9,num);return true;}
		
		if(label[1]==num && label[4]==num && label[7]==num) {change(1,4,7,num);return true;}
		if(label[2]==num && label[5]==num && label[8]==num) {change(2,5,8,num);return true;}
		if(label[3]==num && label[6]==num && label[9]==num) {change(3,6,9,num);return true;}
		
		if(label[1]==num && label[5]==num && label[9]==num) {change(1,5,9,num);return true;}
		if(label[3]==num && label[5]==num && label[7]==num) {change(3,5,7,num);return true;}
	}
	if(label[0]==9)
	{
		GameCount+=1;
		document.getElementById("stan").innerHTML="Stan: Remis!";
		document.getElementById("again").disabled=false;
	}
	return false;
}
function change(a,b,c,num)
{
	GameCount+=1;
	blokada=true;
	if (CurrentPlayer==user1) {user1.win+=1; x=user1;}
	else {user2.win+=1; x=user2;}
	document.getElementById(a).style.color="red";
	document.getElementById(b).style.color="red";
	document.getElementById(c).style.color="red";
	document.getElementById("wyg"+num).innerHTML="Wygrane:"+x.win;
	document.getElementById("stan").innerHTML="Stan: Wygrywa "+CurrentPlayer.sign;
	document.getElementById("again").disabled=false;
}
function Reset()
{
	user1.user='';
	user2.user='';
	user1.win=0;
	user2.win=0;
	blokada=true;
	GameCount=0;
	CurrentPlayer=null;
	var i
	for(i=0;i<10;i++)
	{
		label[i]=0;
	}
	document.getElementById("ktogra1").disabled=false;
	document.getElementById("ktogra2").disabled=false;
	document.getElementById("start").disabled=false;
	document.getElementById("again").disabled=true;
	document.getElementById("wyg1").innerHTML="Wygrane: 0";
	document.getElementById("wyg2").innerHTML="Wygrane: 0";
	document.getElementById("rozgrywka").innerHTML="Rozgrywka: 0";
	document.getElementById("stan").innerHTML="Stan: ";
	x=document.getElementsByClassName("kwadrat")
	for (i = 0; i < x.length; i++) {
		x[i].innerHTML="";
		x[i].style.color="black";
	}
}
function Again()
{
	rand=Math.floor(Math.random() * 8);
	var i
	for(i=0;i<10;i++)
	{
		label[i]=0;
	}
	x=document.getElementsByClassName("kwadrat");
	for (i = 0; i < x.length; i++) {
		x[i].innerHTML="";
		x[i].style.color="black";
	}
	document.getElementById("again").disabled=true;
	document.getElementById("rozgrywka").innerHTML="Rozgrywka: "+(GameCount+1);
	document.getElementById("stan").innerHTML="Stan: ";
	if(CurrentPlayer.user=="Komputer")
	{
		AImove();
	}
	else{
	blokada=false;
	}
}
function AImove()
{
	var num;
	var x;
	if(CurrentPlayer==user1)
	{
	 num=1;
	}
	else
	{
	 num=2;
	}
	label[0]+=1;
	var i;
	for(i=1;i<=9;i++)
	{
		if(label[(i+rand)%9+1]==0) {findid=(i+rand)%9+1; label[findid]=num; break;}
	}
	document.getElementById(findid).innerHTML=CurrentPlayer.sign;
	document.getElementById(findid).style.color="white";
	if(CurrentPlayer==user1)
	{
	
	x=wincheck(1);
	 CurrentPlayer=user2;
	 
	}
	else
	{
	x=wincheck(2);
	 CurrentPlayer=user1;
	 
	}
	if(CurrentPlayer.user=="Komputer" && label[0]<9 && x==false)
	{
		AImove();
	}
	else
	{
	if(x==false)
	{
	blokada=false;
	}
	}
	document.getElementById("ruch").innerHTML="Ruch: Gracz "+CurrentPlayer.sign;
	
}
