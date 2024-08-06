<template>
  <div class="pagPrincipal">
    <p>
      Nos esforzamos más – Porque somos los segundos. Trabajaremos más duro para ganarnos tu preferencia.
    </p>
  
    <img
      id="automovil"
      src="https://upgradedpoints.com/wp-content/uploads/2019/01/Avis_Rent_a_Car_airport.jpg"
      alt="Cannot access to resource"
    />
  </div>
</template>

<script>
import { mensaje } from "@/clients/mensaje";
export default {
};

</script>

<style scoped>
#automovil {
  width: 95%;
  
}
p{
  text-align: center;
  font-size: 2.5vmin;
}
.pagPrincipal {
  background:#f3f1f1;
  width: 100%;
  font-size: 5vmin;
  color: #020202;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>