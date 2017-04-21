#pragma strict
public var icerik : UnityEngine.UI.RawImage;
public var gorseller : Texture[];
public var oyunICI : GameObject;
public var rehber : GameObject;
public var index : int = 0;
public function kapa () {
	oyunICI.SetActive(true);
	rehber.SetActive(false);
}


public function saga () {
	index = index + 1;
	if(index>3){ index = 0 ;}
	icerik.texture = gorseller[index];
}