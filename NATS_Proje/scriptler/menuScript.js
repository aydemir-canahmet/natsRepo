#pragma strict
public var yazilarim : UnityEngine.UI.Text[];
public var menuler : GameObject[];
public var kamera : Camera;
public var sesler : Transform[];
function Start () {
	yazilarim[0].fontSize = Screen.height*0.25;
	for(var i=1 ; i<5;i++){
	yazilarim[i].fontSize = Screen.height*0.1;
	}
	yazilarim[4].text = "top score : "+PlayerPrefs.GetInt("yuksekTaksiSim").ToString();
	Instantiate(sesler[Random.Range(0,2)],Vector3(0,0,0),Quaternion.identity);
}

public function SelectCar () {
	menuler[0].SetActive(false);
	menuler[2].SetActive(false);
	menuler[1].SetActive(true);
	kamera.orthographic = false;
}
public function Oyna () {
	menuler[0].SetActive(false);
	menuler[1].SetActive(false);
	menuler[2].SetActive(true);
}