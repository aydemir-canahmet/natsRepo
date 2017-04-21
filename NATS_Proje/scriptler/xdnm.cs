using UnityEngine;
using System.Collections;

public class xdnm : MonoBehaviour {
	public Transform art;
	public Shader st;
	public Shader ef;
	public bool acik;
	void Start () {

		art = GetComponent<Transform> ();
		acik = true;	

	}
	
	// Update is called once per frame
	void Update () {
		if (acik) {
			degis ();
		}


	}
	public IEnumerator degis () {
		acik = false;
		art.GetComponent<Renderer>().material.shader = st;
		yield return new WaitForSeconds (5.0f);
		art.GetComponent<Renderer>().material.shader = ef;
		yield return new WaitForSeconds (5.0f);
		acik = true;
	}
}
