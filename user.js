const BASE_URL = 'http://localhost:8000/user'; // เปลี่ยน URL ให้ตรงกับ API ที่ใช้งาน
window.onload = async () => {
    await loadData();
};

const loadData = async () => {
    console.log('user page loaded');
    // 1. load user ทั้งหมด จาก api ที่เตรียมไว้
    const response = await axios.get(BASE_URL); // ใช้ BASE_URL เพื่อเรียก API

    console.log(response.data);

    const userDOM = document.getElementById('user');
    // 2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html *แสดงเข้าไปที่ html*
    
    let htmlData = '<table>';
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += `<tr>
        <td>${user.id}</td>
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.gender}</td>
        <td>${user.interests}</td>
        <td>${user.description}</td>
        <td class="actions">
            <a href='kim.html?id=${user.id}'><button class="btn-edit" data-id="${user.id}">Edit</button></a>
            <button class="btn-delete" data-id="${user.id}">Delete</button>
        </td>
    </tr>`;
    }
    htmlData += '</table>'; 
    userDOM.innerHTML = htmlData;

    // 3. delete user
    const deleteDOMs = document.getElementsByClassName('btn-delete'); // เปลี่ยนจาก 'delete' เป็น 'btn-delete'
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            // ดึง id ของ user ที่ต้องการลบ
            const id = event.target.dataset.id;
            try {
                await axios.delete(`${BASE_URL}/${id}`); // เรียก API DELETE
                loadData(); // โหลดข้อมูลใหม่หลังจากลบสำเร็จ
            } catch (error) {
                console.error('error', error);
            }
        });
    }

    // 4. edit user
    const editButtons = document.getElementsByClassName('btn-edit');
    for (let button of editButtons) {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            window.location.href = `kim.html?id=${id}`; // แก้ไขการส่ง `id` ไปที่หน้าแก้ไข
        });
    }
};
