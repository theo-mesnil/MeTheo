//
//  InterfaceController.swift
//  MeTheoWatch WatchKit Extension
//
//  Created by MESNIL Théo on 29/12/2021.
//

import Foundation
import WatchKit
import WatchConnectivity

class InterfaceController: WKInterfaceController, WCSessionDelegate {
  @IBOutlet weak var textToDisplay: WKInterfaceLabel!
   var session: WCSession?

  // Initializes the interface controller with the specified context data
  override func awake(withContext context: Any?) {
    super.awake(withContext: context)
    if WCSession.isSupported() {
      self.session = WCSession.default
      self.session?.delegate = self
      self.session?.activate()
    }
  }
  
  override func willActivate() {
      // This method is called when watch view controller is about to be visible to user
  }
  
  override func didDeactivate() {
      // This method is called when watch view controller is no longer visible
  }

  // Called when the activation of a session finishes
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {}

  // Called when an immediate message arrives
  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
    print("watch received message", message);
    let text = message["message"] as? String
    self.textToDisplay.setText(text)
  }
}
