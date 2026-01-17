import { useAuth } from "@/app/context/authcontext";
import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "../user-form";


export function BiodataSection() {
  const {user} = useAuth();
  const [name, setName] = useState<string>("-");
  const [birthDate, setBirthDate] = useState<string>(""); // "YYYY-MM-DD"
  const [gender, setGender] = useState<string | null>(user?.profile?.gender ?? "");
  const [phone, setPhone] = useState<string>( "-");
  
  useEffect(() => {
  if (user?.profile?.phone) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhone(user.profile.phone);
  }
   if (user?.name) {
    setName(user.name);
  }
}, [user]);

  // state edit
  const [editingName, setEditingName] = useState(false);
  const [editingBirthDate, setEditingBirthDate] = useState(false);
  const [editingGender, setEditingGender] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);

  // draft
  const [draftName, setDraftName] = useState("");
  const [draftBirthDate, setDraftBirthDate] = useState("");
  const [draftGender, setDraftGender] = useState("");
  const [draftPhone, setDraftPhone] = useState("");

const openEditPhone = () => {
    setDraftPhone( phone === "-" ? "" : phone );
    setEditingPhone(true);
  };

  const savePhone = async () => {
    try{
        const response = await axios.get("http://localhost:3001/api/auth/refresh", {
            withCredentials: true,
          });
        const token = response.data.accesToken;
        setEditingName(false);
        await axios.post("http://localhost:3001/api/user/profil", { 
          phone: draftPhone }, 
          { 
            headers: { Authorization: `Bearer ${token}` ,
          },
          withCredentials: true })
          setPhone(draftPhone);
          setEditingPhone(false);
          window.location.reload();
      }catch (err) {
        if (axios.isAxiosError(err)) {
          console.log("status:", err.response?.status);
          console.log("data:", err.response?.data);
        } else {
          console.log(err);
        }
      }
    };
    

  const openEditName = () => {
    setDraftName(name || user?.name || "");
    setEditingName(true);
  };

  
  const saveName = async () => {
    try{
      const response = await axios.get("http://localhost:3001/api/auth/refresh", {
           withCredentials: true,
         });
      const token = response.data.accesToken;
      setName(draftName);
      setEditingName(false);
      window.location.reload();
      await axios.post("http://localhost:3001/api/user/profil", { 
        name: draftName }, 
        { 
          headers: { Authorization: `Bearer ${token}` ,
        },
        withCredentials: true })
    }catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("status:", err.response?.status);
        console.log("data:", err.response?.data);
      } else {
        console.log(err);
      }
}
  };

  
  
  const openEditBirthDate = () => {
    setDraftBirthDate(birthDate || "");
    setEditingBirthDate(true);
  };

  const saveBirthDate = async () => {
    setBirthDate(draftBirthDate);
    setEditingBirthDate(false);
    await axios.post("http://localhost:3001/api/user/profile", { birthDate: draftBirthDate }, { withCredentials: true })
  };



  // JENIS KELAMIN
  const openEditGender = () => {
    setDraftGender(gender ?? "");
    setEditingGender(true);
  };

  const saveGender = async() => {
    try{
      setGender(draftGender);
      setEditingGender(false);
      await axios.post("http://localhost:3001/api/user/profil", { 
        gender: draftGender}, 
        { 
      
        withCredentials: true })
    }
    catch(err){
      if (axios.isAxiosError(err)) {
        console.log("status:", err.response?.status);
        console.log("data:", err.response?.data); // ⬅ penting
      }
    }
  };
  return (
    <div className="flex gap-8">
      {/* Foto profil */}
      <div className="w-64 flex flex-col items-center">
        <div className="w-56 h-56 bg-blue-500 rounded-md overflow-hidden mb-4" />
        <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
          Pilih Foto
        </button>
      </div>

      {/* Form biodata */}
      <div className="flex-1 text-sm space-y-6">
        <section>
          <h2 className="font-semibold mb-3">Ubah Biodata Diri</h2>
           <Row 
              label="Nama"
              value={
                editingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      className="border px-2 py-1 text-sm"
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                    />
                    <button className="text-xs text-green-600" onClick={saveName}>
                      Simpan
                    </button>
                    <button
                      className="text-xs text-gray-500"
                      onClick={() => setEditingName(false)}
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  user?.name || "-"
                )
              }
              action={editingName ? undefined : phone ? "Ubah" : "Tambah Nomor"}
              onAction={editingName ? undefined : openEditName}
           
             />
           

          <Row label="Tanggal Lahir" value={user?.profile?.birthDate ?? "-"} action="Tambah Tanggal Lahir" />
           <Row
          label="Jenis Kelamin"
          value={gender ?? "-"}
          action={gender ? "Ubah Jenis Kelamin" : "Tambah Jenis Kelamin"}
          onAction={openEditGender}
        />
        {editingGender && (
          <div className="mt-2 flex items-center gap-2">
            <select
              className="border px-2 py-1 text-sm"
              value={draftGender}
              onChange={(e) => setDraftGender(e.target.value)}
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="LAKI_LAKI">Laki-laki</option>
              <option value="PEREMPUAN">Perempuan</option>
            </select>
            <button 
            className="text-xs text-green-600" 
            onClick={saveGender}>
              Simpan
            </button>
            <button
              className="text-xs text-gray-500"
              onClick={() => setEditingGender(false)}
            >
              Batal
            </button>
          </div>
        )}

        </section>

        <section>
          <h2 className="font-semibold mb-3">Ubah Kontak</h2>
          <Row label="Email" 
          value={user?.email ?? "-"} 
          action={user?.email  ? "Ubah" : "Tambah Phone"} />
          <Row
            label="Nomor HP"
              value={
                editingPhone ? (
                  <div className="flex items-center gap-2">
                    <input
                      className="border px-2 py-1 text-sm"
                      value={draftPhone}
                      onChange={(e) => setDraftPhone(e.target.value)}
                    />
                    <button className="text-xs text-green-600" onClick={savePhone}>
                      Simpan
                    </button>
                    <button
                      className="text-xs text-gray-500"
                      onClick={() => setEditingPhone(false)}
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  user?.profile?.phone || "-"
                )
              }
            action={editingPhone ? undefined : phone ? "Ubah" : "Tambah Nomor"}
            onAction={editingPhone ? undefined : openEditPhone}
          />
          </section>
        </div>
      </div>
    );
  }