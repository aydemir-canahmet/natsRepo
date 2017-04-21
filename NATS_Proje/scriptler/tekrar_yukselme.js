#pragma strict
public var mevki : Transform;
public var ordek : Transform;

function Start () {
	Yonelis();
}
function Yonelis () {
	ordek.LookAt(mevki);
}
function LateUpdate () {
	Yonelis();
	ordek.position += ordek.TransformDirection(Vector3(0,0,10)*Time.deltaTime);
}
function OnCollisionEnter(){
	yield WaitForSeconds(1.0);
	mevki.gameObject.SetActive(false);
}