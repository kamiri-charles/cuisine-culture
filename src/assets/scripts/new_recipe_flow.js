// let pages = ['one', 'two', 'three']
// :: This would probably be better with a switch statement or anything else
// :: NOTE! To change this later
// :: Add a preview page later

// Section = e.target.parentElement.parentElement
export const next_page = e => {
    let active_sect = e.target.parentElement.parentElement;
    
    // Sect one
    if (active_sect.classList.contains('one')) {
        active_sect.style.display = 'none';
        document.getElementById('three').style.display = 'none';
        document.getElementById('two').style.display = 'flex';
        console.log(active_sect);
    }
    
    // Sect two
    else if (active_sect.classList.contains('two')) {
        active_sect.style.display = 'none';
        document.getElementById('one').style.display = 'none';
        document.getElementById('three').style.display = 'flex';
        console.log(document.getElementById('three'));
    }

    // Sect three
    else if (active_sect.classList.contains('three')) {
        e.preventDefault();
        console.log('DONE!!')
    }
}

export const prev_page = e => {
    let active_sect = e.target.parentElement.parentElement;

     // Sect two
     if (active_sect.classList.contains('two')) {
        active_sect.style.display = 'none'
        document.getElementById('three').style.display = 'none';
        document.getElementById('one').style.display = 'flex';
    }
    
    // Sect three
    if (active_sect.classList.contains('three')) {
        active_sect.style.display = 'none'
        document.getElementById('one').style.display = 'none';
        document.getElementById('two').style.display = 'flex';
    }

}

