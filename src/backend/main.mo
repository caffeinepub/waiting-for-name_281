import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

actor {

  type User = {
    id : Nat;
    name : Text;
    mobile : Text;
    password : Text;
    var balance : Nat;
  };

  // Map from mobile -> User
  let usersByMobile : Map.Map<Text, User> = Map.empty<Text, User>();
  // Map from id -> User
  let usersById : Map.Map<Nat, User> = Map.empty<Nat, User>();
  var nextId : Nat = 1;

  // register: creates a new user with 100 TK signup bonus
  public func register(name : Text, mobile : Text, password : Text) : async { #ok : { id : Nat; name : Text; balance : Nat }; #err : Text } {
    switch (usersByMobile.get(mobile)) {
      case (?_existing) {
        #err("Mobile number already registered");
      };
      case null {
        let id = nextId;
        nextId += 1;
        let user : User = {
          id;
          name;
          mobile;
          password;
          var balance = 100;
        };
        usersByMobile.add(mobile, user);
        usersById.add(id, user);
        #ok({ id; name; balance = 100 });
      };
    };
  };

  // login: validates credentials and returns user info
  public query func login(mobile : Text, password : Text) : async { #ok : { id : Nat; name : Text; balance : Nat }; #err : Text } {
    switch (usersByMobile.get(mobile)) {
      case (?user) {
        if (user.password == password) {
          #ok({ id = user.id; name = user.name; balance = user.balance });
        } else {
          #err("Invalid password");
        };
      };
      case null {
        #err("Mobile number not found");
      };
    };
  };

  // getBalance: returns current balance for user
  public query func getBalance(id : Nat) : async { #ok : Nat; #err : Text } {
    switch (usersById.get(id)) {
      case (?user) { #ok(user.balance) };
      case null { #err("User not found") };
    };
  };

  // getUser: returns user profile including mobile
  public query func getUser(id : Nat) : async { #ok : { id : Nat; name : Text; mobile : Text; balance : Nat }; #err : Text } {
    switch (usersById.get(id)) {
      case (?user) {
        #ok({ id = user.id; name = user.name; mobile = user.mobile; balance = user.balance });
      };
      case null { #err("User not found") };
    };
  };

};
