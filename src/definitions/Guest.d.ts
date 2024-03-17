type GuestAction = ActionType &
  (
    | "balloonpress"
    | "guestsetflags"
    | "guestsetname"
    | "peeppickup"
    | "peepspawnplace"
  );

type StaffAction = ActionType &
  (
    | "stafffire"
    | "staffhire"
    | "staffsetcolour"
    | "staffsetcostume"
    | "staffsetname"
    | "staffsetorders"
    | "staffsetpatrolarea"
  );
