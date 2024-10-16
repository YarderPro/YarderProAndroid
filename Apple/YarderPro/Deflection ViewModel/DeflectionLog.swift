//
//  DeflectionLog.swift
//  Forestry
//
//  Created by Drew Hengehold on 9/24/24.
//
import Foundation
import Combine

class DeflectionLog: ObservableObject, Identifiable{
    //Each log must be unique to be listed so we need a unique ID
    var id = UUID()
    // All the variables used in the detail tab
    @Published var logName: String = ""
    @Published var logDate: Date = Date()
    @Published var description: String = ""
    @Published var southCoord: Double? = nil
    @Published var northCoord: Double? = nil
    @Published var eastCoord: Double? = nil
    @Published var westCoord: Double? = nil
    
    //All the variables used in the deflection calculator tab
    //% Deflection = (Sground– Smidspan) / 2.2 + (TowerH / Length) / 2.2 x 100%
    @Published var spanGround: Double? = nil
    @Published var spanMidSpan: Double? = nil
    @Published var percentDeflection: Double? = nil
    @Published var TowerHeight: Double? = nil
    @Published var Length: Double? = nil
    
    
    
    //All variables for the tension tab
    
    //All variables for the Diagram Tap
    
    //All Variables for the Map Tab
}
