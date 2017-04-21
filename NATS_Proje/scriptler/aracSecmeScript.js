#pragma strict
public var aracno : int ;
var acikmi : int;
public var araclar : Transform[];
public var menuler : GameObject[];
public var kilidAc : GameObject[];
public var coinMik : UnityEngine.UI.Text;
public var kam : GameObject;
public function Sec () {
	
	if(acikmi != 0){
		menuler[0].SetActive(false);
		menuler[1].SetActive(true);
		PlayerPrefs.SetInt("secilenTaxi",aracno);
		kam.GetComponent(Camera).orthographic = true;
	}
}
function Start () {
	AracOlustur();
}
public function sola () {
	aracno = aracno - 1;
	if(aracno<0){ aracno = araclar.length-1; }
	AracOlustur();
}

public function saga () {
	aracno = aracno + 1;
	if(aracno == araclar.length){ aracno = 0; }
	AracOlustur();
}
public function kAC () {
	var coin = PlayerPrefs.GetInt("taksiCoin") ;
	if(coin>= (aracno*3000)){
		PlayerPrefs.SetInt("acik"+aracno.ToString(),1);
		PlayerPrefs.SetInt("taksiCoin",coin-5000);
	}
}
function Update () {
	if( aracno == 0 || aracno == 1) { acikmi = 1; }
	else{ acikmi = PlayerPrefs.GetInt("acik"+aracno.ToString()); }
	if( acikmi == 0 ) { 
		kilidAc[0].SetActive(true); kilidAc[1].SetActive(true); 
	} else { 
		kilidAc[0].SetActive(false); kilidAc[1].SetActive(false); 
	}
	coinMik.text = 	"unlock for "+(aracno*3000).ToString()+ "c\nyou have : "+PlayerPrefs.GetInt("taksiCoin").ToString()+"c";

}
function AracOlustur () {
	Destroy(GameObject.FindWithTag("taksi"));
	Instantiate(araclar[aracno],Vector3(0,-1.5,0),Quaternion.identity);
}
