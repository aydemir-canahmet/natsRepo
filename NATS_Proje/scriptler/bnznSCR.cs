using UnityEngine;
using System.Collections;
using UnityEngine.Advertisements;
using UnityEngine.UI;
using NativeAlert;
public class bnznSCR : MonoBehaviour {

	public Scrollbar benzinG;

	public float fuel = 1.0f;
	public int coin;
	public Transform arac;
	public Transform benzinlik;
	public GameObject benBit;
	public GameObject oyunUI;
	public GameObject afterOyun;
	public GameObject bnznISR;
	public GameObject muzigim;
	public GameObject noads;
	public Text msjT;
	void Start () {
		coin = PlayerPrefs.GetInt("taksiCoin") ;
		ReklamYukle ();
		Bekle ();

	}
	void Bekle () {
		arac = GameObject.FindWithTag("Player").GetComponent<Transform> ();
		benzinlik = GameObject.Find("benzinlik").GetComponent<Transform>();
	}
	// Update is called once per frame
	void Update () {

		benzinG.size = fuel;
		if (RCCCarControllerV2.engineRunning) {
			fuel -= 0.005f * Time.deltaTime;
		}
		if (fuel <= 0) {
			RCCCarControllerV2.engineRunning = false;
			benBit.SetActive (true);
			oyunUI.SetActive (false);
			fuel = 0;
		}
	}
	public void benzinAL () {
		if (Mathf.Abs(Vector3.Distance (arac.position, benzinlik.position)) <= 7) {
			coin = PlayerPrefs.GetInt ("taksiCoin");
			int eder = Mathf.FloorToInt(coin / 25);
			if (eder >= 1) {
				var gerekli = 1.0f - fuel;
				if ( (eder/10) > gerekli) {
					fuel += gerekli;
					coin -= Mathf.FloorToInt( gerekli*25 );
				} else {
					fuel += 0.1f * eder;
					if (fuel >= 1.0f) {
						fuel = 1.0f;
					}
					coin -= Mathf.FloorToInt( eder*25 );
				}
				PlayerPrefs.SetInt ("taksiCoin", coin);
			}
			bnznISR.SetActive (false);
		} else {
			bnznISR.SetActive (true);

		} 
	}
	public void OneMoreChance () {
		if (Advertisement.IsReady ()) {
			Advertisement.Show ();
			benBit.SetActive (false);
			oyunUI.SetActive (true);
			fuel = 1.0f;
		} else {
			noads.SetActive (true);
		}

	}
	public void OyunBitir () {
		fuel = 1.0f;
		msjT.text = "current score : "+PlayerPrefs.GetInt("geciciTaksiSim").ToString()+"\ntop score : "+PlayerPrefs.GetInt("yuksekTaksiSim").ToString();
		PlayerPrefs.SetInt("geciciTaksiSim",0);
		benBit.SetActive (false);
		oyunUI.SetActive (false);
		afterOyun.SetActive (true);
		Transform x = (Instantiate(muzigim,GameObject.FindWithTag ("Player").GetComponent<Transform>().position,Quaternion.identity) as GameObject).GetComponent<Transform>();

	}
	public void Motor () {
		GameObject.FindWithTag ("Player").GetComponent<RCCCarControllerV2> ().motorACKAPA ();
	}
	IEnumerator ReklamYukle ()
	{
		
		if (Advertisement.isSupported) {
			Advertisement.Initialize ("1286463", true);
		}


		// Wait until Unity Ads is initialized,
		//  and the default ad placement is ready.
		while (!Advertisement.isInitialized || !Advertisement.IsReady()) {
			yield return new WaitForSeconds(0.5f);
		}

		// Show the default ad placement.

	}



	public void AdKAPA () {
		noads.SetActive (false);
	}
}
