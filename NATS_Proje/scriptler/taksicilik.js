#pragma strict
import UnityEngine.Advertisements;
public var tAcik : boolean = false;
public var tResc : GameObject[];
public var duraklar : GameObject[];
public var musteriler : GameObject[];
public var partikul : Transform;
public var secim : GameObject;
public var kapi : GameObject;
public var okAC : GameObject;
public var yonlen : Transform;
public var yonrot : Quaternion;
public var sure : float ;
public var sTAB : UnityEngine.UI.Text ;
public var coinT : UnityEngine.UI.Text ;
public var msjT : UnityEngine.UI.Text ;
public var maxT : UnityEngine.UI.Text ;
public var scrT : UnityEngine.UI.Text ;
public var btrT : UnityEngine.UI.Text ;
public var coin : int ;
public var bahsis : int ;
public var isbedeli : int ;
public var isadedi : int = 0;

public var muzikler : GameObject[];
public var basarisizlik : GameObject;
public var oyunUIM : GameObject;
public var afterGame : GameObject;
public var bsizlik2 : GameObject;
public var rehber : GameObject;
public var noads : GameObject;

public var aracim : GameObject ;

public function taksiyiAC () {
	isbedeli = 0 ; bahsis = 0 ;
	coinT.gameObject.SetActive(false);
	sTAB.gameObject.SetActive(true);

	tAcik = true;
	tResc[0].SetActive(false);
	tResc[1].SetActive(true);
}
public function taksiyiKAPA () {
	tAcik = false;
	kapi.SetActive(false);

	tResc[0].SetActive(true);
	tResc[1].SetActive(false);
}
public function MusteriAl () {

	if( secim.tag=="musteri" && Mathf.Abs(Vector3.Distance(secim.GetComponent(Transform).position , aracim.GetComponent(Transform).position)) <= 10 ) {
		secim.GetComponent(Transform).position.y = -10;
		secim = duraklar[Random.Range(0,duraklar.length-1)];
		if(Mathf.Abs(Vector3.Distance(secim.GetComponent(Transform).position , aracim.GetComponent(Transform).position)) <= 10){
			secim = duraklar[Random.Range(0,duraklar.length-1)];
		}
		secim.SetActive(true);
		partikul.position = secim.GetComponent(Transform).position;
		partikul.gameObject.SetActive(true);
		bahsis = int.Parse(sure.ToString("0"))*2;
		sure = Mathf.Abs(Vector3.Distance(aracim.GetComponent(Transform).position,partikul.position))/3;
	} else if ( secim.tag=="durak" && Mathf.Abs(Vector3.Distance(secim.GetComponent(Transform).position , aracim.GetComponent(Transform).position)) <= 10  )
	{

		var gecici = GameObject.FindWithTag("musteri");
		gecici.GetComponent(Transform).GetChild(0).gameObject.GetComponent(BoxCollider).isTrigger = true ;
		gecici.GetComponent(Transform).position = partikul.position;
		yonlen.gameObject.SetActive(false);
		partikul.gameObject.SetActive(false);
		taksiyiKAPA();
		musteriYokEt(gecici);


		secim = GameObject.Find("secimBOS");
		sTAB.gameObject.SetActive(false);
		coinT.gameObject.SetActive(true);
		isbedeli = int.Parse(sure.ToString("0"))*2;
		coin += isbedeli + bahsis ;
		PlayerPrefs.SetInt("taksiCoin",coin);
		msjT.gameObject.SetActive(true);
		msjT.color = Color.green;
		msjT.text = "congrats! \n"+isbedeli.ToString()+" c\nTip: "+bahsis.ToString()+" c";
		mesajBitir(5);
		isadedi = isadedi + 1 ;
		PlayerPrefs.SetInt("geciciTaksiSim",isadedi);
		if( isadedi > PlayerPrefs.GetInt("yuksekTaksiSim") ){
			PlayerPrefs.SetInt("yuksekTaksiSim",isadedi);
		}
		var xi = Instantiate(muzikler[1],aracim.GetComponent(Transform).position,Quaternion.identity).GetComponent(Transform);
		musteriYokEt(xi.gameObject);
		if((isadedi%3)==0){
		Advertisement.Show();
		}
	}
}

function Start () : IEnumerator {
	coin = PlayerPrefs.GetInt("taksiCoin") ;
	sTAB.fontSize = Screen.height*0.1;
	msjT.fontSize = Screen.height*0.1;
	btrT.fontSize = Screen.height*0.15;
	coinT.fontSize = Screen.height*0.06;
	OkGoster();
	isadedi = PlayerPrefs.GetInt("geciciTaksiSim");
	maxT.text = "TOP\n"+PlayerPrefs.GetInt("yuksekTaksiSim").ToString();

	aracim = GameObject.FindWithTag("Player");
	yonlen.position = aracim.GetComponent(Transform).position + Vector3(0,5,0);
	yonlen.parent = aracim.GetComponent(Transform);
	Uyanis();
	yonrot = yonlen.rotation;
	 if (Advertisement.isSupported) { // If runtime platform is supported...
        Advertisement.Initialize("1286463", true); // ...initialize.
    }
     while (!Advertisement.isInitialized || !Advertisement.IsReady()) {
        yield WaitForSeconds(0.5);
    }
}
function Uyanis () {
	tResc[0].SetActive(false);
	yield WaitForSeconds(1.0);
	duraklar = GameObject.FindGameObjectsWithTag("durak");
	tResc[0].SetActive(true);
}

function Update () {
	if( Input.GetKey("t")){
	Application.CaptureScreenshot("resim.png",5);
	}
	scrT.text = "NOW\n"+isadedi.ToString();
	if( sure < 0 ) { sure = 0; }
	if( sure == 0 && secim.tag == "durak" ) { basarisizTeslimat (); } 
	if(tAcik) {
		musteriOlustur();
	} else {
		sure -= 0.8*Time.deltaTime;
		sTAB.text = sure.ToString("0")+"s";
		if( secim.tag=="musteri" ) { // Eğer insansa araca yönelsin.
			secim.GetComponent(Transform).LookAt(aracim.GetComponent(Transform));
		}
		yonlen.LookAt(secim.GetComponent(Transform));
		yonlen.rotation.x = yonrot.x ; yonlen.rotation.z = yonrot.z;
	}
	coinT.text = coin.ToString();


}
function musteriOlustur () {

	yonlen.gameObject.SetActive(true);
	taksiyiKAPA();
	tResc[0].SetActive(false);
	secim = Instantiate(musteriler[Random.Range(0,musteriler.length-1)].GetComponent(Transform),duraklar[Random.Range(0,duraklar.length-1)].GetComponent(Transform).position,Quaternion.identity).gameObject;
	var xi = Instantiate(muzikler[0],aracim.GetComponent(Transform).position,Quaternion.identity).GetComponent(Transform);
	musteriYokEt(xi.gameObject);
	partikul.position = secim.GetComponent(Transform).position;
	partikul.gameObject.SetActive(true);
	sure = Mathf.Abs(Vector3.Distance(aracim.GetComponent(Transform).position,partikul.position))/3.5;
	kapi.SetActive(true);
	
}
function musteriYokEt (nesne) {
	yield WaitForSeconds(10.0);
	Destroy(nesne);
}
// mesafe
function basarisizTeslimat () {

	var gecici = GameObject.FindWithTag("musteri");
	gecici.GetComponent(Transform).GetChild(0).gameObject.GetComponent(BoxCollider).isTrigger = true ;
	gecici.GetComponent(Transform).position = aracim.GetComponent(Transform).position + aracim.GetComponent(Transform).TransformDirection(Vector3(5,0,0));
	musteriYokEt(gecici);
	coin -= 1000;
	PlayerPrefs.SetInt("taksiCoin",coin);
	msjT.gameObject.SetActive(true);
	msjT.color = Color.red;
	msjT.text = "failure! \n-1000 c";
	mesajBitir(10);

	var xi = Instantiate(muzikler[2],aracim.GetComponent(Transform).position,Quaternion.identity).GetComponent(Transform);
	musteriYokEt(xi.gameObject);

	taksiyiKAPA();
	secim = GameObject.Find("secimBOS");
	yonlen.gameObject.SetActive(false);
	partikul.gameObject.SetActive(false);
	coinT.gameObject.SetActive(true);
	sTAB.gameObject.SetActive(false);
	PlayerPrefs.SetInt("geciciTaksiSim",isadedi);
	ekraniGoster();
}
function mesajBitir (sny) {
	yield WaitForSeconds(sny);
	msjT.gameObject.SetActive(false);

}
function ekraniGoster () {
	yield WaitForSeconds(3.0);
	basarisizlik.SetActive(true);
	oyunUIM.SetActive(false);
}
public function OneMoreChancePlease () {
	if( Advertisement.IsReady()){
		Advertisement.Show();
		basarisizlik.SetActive(false);
		oyunUIM.SetActive(true);
	} else {
		noads.SetActive (true);
	}
}
public function OyunuBitir () {
	PlayerPrefs.SetInt("geciciTaksiSim",0);
	secim =  GameObject.Find("secimBOS");
	if( isadedi > PlayerPrefs.GetInt("yuksekTaksiSim") ){
			PlayerPrefs.SetInt("yuksekTaksiSim",isadedi);
	}
	bsizlik2.SetActive(false);

	afterGame.SetActive(true);
	basarisizlik.SetActive(false);
	btrT.text = "current score : "+isadedi.ToString()+"\ntop score : "+PlayerPrefs.GetInt("yuksekTaksiSim").ToString();


}
public function AltinArtir () {
	if( Advertisement.IsReady()){
		Advertisement.Show();
		coin += Random.Range(50,200);
		PlayerPrefs.SetInt("taksiCoin",coin) ;
		Application.LoadLevel(Application.loadedLevelName);
	} else {
		noads.SetActive (true);
	}
}

public function TekrarOyna () {
	Advertisement.Show();
	Application.LoadLevel(Application.loadedLevelName);
}
public function AnaMenu () {
	Application.LoadLevel(0);
}
function OkGoster (){
	var IX = PlayerPrefs.GetInt("acildi");
	PlayerPrefs.SetInt("acildi",IX+1);
	if((IX%5)==0 && IX>4){
		goruntule();
	} else if( IX<4 || ((IX%7)==0) ) {
		rehberGoster();
	}
}
function rehberGoster () {
	rehber.SetActive(true);
	oyunUIM.SetActive(false);
}
function goruntule () {
	okAC.SetActive(true);
	yield WaitForSeconds(0.3);
	okAC.SetActive(false);
		yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
		yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
	yield WaitForSeconds(0.3);
	okAC.SetActive(true);
	yield WaitForSeconds(0.3);
	okAC.SetActive(false);
		yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
		yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
	yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
		yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
	yield WaitForSeconds(0.3);
	okAC.SetActive(true);
	yield WaitForSeconds(0.3);
	okAC.SetActive(false);
		yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
		yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
	yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
		yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
	yield WaitForSeconds(0.3);
	okAC.SetActive(true);
	yield WaitForSeconds(0.3);
	okAC.SetActive(false);
		yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
		yield WaitForSeconds(0.3);
	okAC.SetActive(true);
		yield WaitForSeconds(0.3);
	okAC.SetActive(false);
}
public function AltinGuncelle () {
coin = PlayerPrefs.GetInt("taksiCoin") ;
}